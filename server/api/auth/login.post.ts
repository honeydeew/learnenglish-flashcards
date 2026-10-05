import {loginUser} from '../../services/auth'


export default defineEventHandler(async (event) => {
    const body = await readBody<{email?: string, password?: string}>(event)

    try {
        const user = await loginUser({
            email: body.email ?? '',
            password: body.password ?? ''
        })
        await setUserSession(event, {user: {userId: user.id}})
        return user
    } catch(error) {
        const message = error instanceof Error ? error.message :'не удалось войти'
        throw createError({statusCode: 400, statusMessage: message})
    }
})
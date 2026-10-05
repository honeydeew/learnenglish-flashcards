import {getCurrentRound} from '../../services/learn'

export default defineEventHandler(async(event) => {
    const session = await requireUserSession(event)

    try {
        return await getCurrentRound(session.user.userId)
    } catch(error) {
        const message = error instanceof Error ? error.message : 'не удалось открыть карточку'
        throw createError({statusCode: 400, statusMessage: message})
    }
})
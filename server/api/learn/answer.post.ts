import { submitAnswer } from "../../services/learn"

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)
    const body = await readBody<{guess?: string}>(event)
    const guess = body.guess?.trim() ?? ''

    if(!guess){
        throw createError({statusCode: 400, statusMessage: 'введите слово'})
    }

    try {
        return await submitAnswer(session.user.userId, guess)
    } catch(error){
        const message = error instanceof Error ? error.message : 'не удалось проверить ответ'
        throw createError({ statusCode: 400, statusMessage: message })
    }
})

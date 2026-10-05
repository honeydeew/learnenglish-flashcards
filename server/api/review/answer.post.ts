import { submitReview } from '../../services/review'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const body = await readBody<{ wordId?: number, guess?: string, attemptsLeft?: number }>(event)
  const guess = body.guess?.trim() ?? ''
  const wordId = body.wordId
  const attemptsLeft = body.attemptsLeft

  if (!guess) {
    throw createError({ statusCode: 400, statusMessage: 'введите слово' })
  }
  if (!wordId || attemptsLeft == null) {
    throw createError({ statusCode: 400, statusMessage: 'не удалось проверить ответ' })
  }

  try {
    return await submitReview(session.user.userId, wordId, guess, attemptsLeft)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'не удалось проверить ответ'
    throw createError({ statusCode: 400, statusMessage: message })
  }
})
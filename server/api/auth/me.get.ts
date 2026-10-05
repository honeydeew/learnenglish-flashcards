import { getUserById } from '../../services/auth'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const user = await getUserById(session.user.userId)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Нужно войти' })
  return user
})
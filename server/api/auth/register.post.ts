import { registerUser } from '../../services/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ name?: string, email?: string, password?: string, confirm?: string }>(event)
  const name = body.name?.trim() ?? ''
  const email = body.email?.trim() ?? ''
  const password = body.password ?? ''
  const confirm = body.confirm ?? ''

  if (!name || !email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Заполни имя, email и пароль' })
  }
  if (password !== confirm) {
    throw createError({ statusCode: 400, statusMessage: 'Пароли не совпадают' })
  }

  try {
    const user = await registerUser({ name, email, password })
    await setUserSession(event, { user: { userId: user.id } })
    return user
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Не удалось зарегистрироваться'
    throw createError({ statusCode: 400, statusMessage: message })
  }
})
import type { PublicUser } from '#shared/types'

function errorMessage(error: unknown, fallback: string) {
    if (error && typeof error === 'object' && 'data' in error) {
      const data = (error as { data?: { message?: string, statusMessage?: string } }).data
      if (data?.message) return data.message
      if (data?.statusMessage) return data.statusMessage
    }
    return fallback
  }


export function useAuth() {
    const user = useState<PublicUser | null>('auth-user', () => null)

    async function fetchUser() {
        try {
            user.value = await $fetch<PublicUser>('/api/auth/me')
        } catch {
            user.value = null
        }
    }

    async function login(input: { email: string, password: string }) {
        try {
          user.value = await $fetch<PublicUser>('/api/auth/login', { method: 'POST', body: input })
        } catch (error) {
          throw new Error(errorMessage(error, 'Не удалось войти'))
        }
      }

    async function register(input: { name: string, email: string, password: string, confirm: string }) {
        try {
          user.value = await $fetch<PublicUser>('/api/auth/register', { method: 'POST', body: input })
        } catch (error) {
          throw new Error(errorMessage(error, 'Не удалось зарегистрироваться'))
        }
      }

      async function logout() {
        await $fetch('/api/auth/logout', { method: 'POST' })
        user.value = null
      }

      return {user, fetchUser, login, register, logout}

}
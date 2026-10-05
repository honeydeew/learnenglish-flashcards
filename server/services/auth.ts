import { hashPassword, verifyPassword } from "../utils/password";
import { createUser, findUserByEmail, findUserById, toPublicUser } from '../repositories/users'

export async function registerUser(input:{name: string, email: string, password: string}) {
    const email = input.email.trim().toLowerCase()
    const name = input.name.trim()
    const existing = await findUserByEmail(email)
    if(existing) throw new Error("такой email уже есть");
    
    const passwordHash = await hashPassword(input.password)
    const user = await createUser({name, email, passwordHash})
    return toPublicUser(user)
}

export async function loginUser(input:{email: string, password: string}) {
    const email = input.email.trim().toLowerCase()
    const user = await findUserByEmail(email)
    if(!user) throw new Error('неверный email или пароль')

    const ok = await verifyPassword(input.password, user.passwordHash)
    if(!ok) throw new Error('неверный email или пароль')
    return toPublicUser(user)
}


export async function getUserById(id:number) {
    const user = await findUserById(id)
    if(!user) return null
    return toPublicUser(user)
}
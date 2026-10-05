import { readDb, updateDb, type DbUser } from '../db/store'


export async function findUserByEmail(email:string) {
    const db = await readDb()
    return db.users.find((user) => user.email === email) ?? null
}

export async function findUserById(id:number) {
    const db = await readDb()
    return db.users.find((user) => user.id === id) ?? null
}

export async function createUser(input:{name: string, email: string, passwordHash: string}) {
    await updateDb((db) => {
        const id = db.users.reduce((max, user) => Math.max(max, user.id), 0) + 1
        db.users.push({
            id,
            name: input.name,
            email: input.email,
            passwordHash: input.passwordHash,
            createdAt: new Date().toISOString()
        })
    })

    const user = await findUserByEmail(input.email)

    if (!user) throw new Error('Не удалось сохранить пользователя')
    return user
}

export function toPublicUser(user: DbUser){
    return {id: user.id, name: user.name, email: user.email}
}
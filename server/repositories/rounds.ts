import {readDb, updateDb, type DbRound} from '../db/store'

export async function findActiveRound(userId:number) {
    const db = await readDb()
    return db.rounds.find(round => round.userId === userId && round.status === 'active')
}


export async function createRound(userId:number, wordId: number) {
    let createdId = 0

    await updateDb((db) => {
        createdId = db.rounds.reduce((max, round) => Math.max(max, round.id), 0) + 1
        db.rounds.push({
            id: createdId,
            userId,
            wordId,
            attemptsUsed: 0,
            status: 'active'
        })
    })

    const round = await findActiveRound(userId)
    if(!round) throw new Error('не удалось создать карточку')
    return round
}

export function saveRound(round: DbRound){
    return updateDb((db) => {
        const index = db.rounds.findIndex((item) => item.id === round.id)
        if(index === -1) return
        db.rounds[index] = round
    })
}
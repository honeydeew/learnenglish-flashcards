import { registerRuntimeCompiler } from 'vue'
import {readDb, updateDb} from '../db/store'

export async function findLearnedByUser(userId:number) {
    const db = await readDb()
    return db.learnedWords.filter(item => item.userId === userId)
}


export function addLearnedWord(userId: number, wordId: number) {
    return updateDb((db) => {
        const exists = db.learnedWords.some(item => item.userId === userId && item.wordId === wordId)
        if(exists) return
        db.learnedWords.push({
            userId,
            wordId,
            learnedAt: new Date().toISOString()
        })
    })
}
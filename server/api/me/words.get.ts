import type { LearnedWord } from "../../../shared/types";
import { findLearnedByUser } from "~~/server/repositories/learned-words";
import { findWordById } from "~~/server/repositories/words";

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)
    const rows = await findLearnedByUser(session.user.userId)
    const words: LearnedWord[] = []

    for(const row of rows){
        const word = findWordById(row.wordId)
        if(!word) continue
        words.push({
            english: word.english,
            russian: word.russian,
            learned: row.learnedAt
        })
    }

    return words
})


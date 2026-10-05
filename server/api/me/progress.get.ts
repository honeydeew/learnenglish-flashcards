import { findLearnedByUser } from "~~/server/repositories/learned-words";
import { getWords } from "~~/server/repositories/words";

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)
    const learned = await findLearnedByUser(session.user.userId)

    return {
        learned: learned.length,
        total: getWords().length
    }
})
import { findLearnedByUser } from "../repositories/learned-words";
import { findWordById } from "../repositories/words";

export async function getReviewPrompt(userId: number) {
    const learned = await findLearnedByUser(userId)
    if(learned.length === 0) return {done: true as const}

    const row = learned[Math.floor(Math.random() * learned.length)]!
    const word = findWordById(row.wordId)
    if(!word) throw new Error('слово не найдено')

    return {
        done: false as const,
        prompt: { id: word.id, russian: word.russian },
        attemptsLeft: 3,
      }
}


export async function submitReview(userId: number, wordId: number, guess: string, attemptsLeft: number) {
  const learned = await findLearnedByUser(userId)
  if (!learned.some((item) => item.wordId === wordId)) {
    throw new Error('Это слово ещё не выучено')
  }

  const word = findWordById(wordId)
  if (!word) throw new Error('Слово не найдено')

  const correct = guess.trim().toLowerCase() === word.english.trim().toLowerCase()
  const left = correct ? attemptsLeft : attemptsLeft - 1

  return {
    correct,
    attemptsLeft: left,
    revealed: correct || left <= 0,
    english: correct || left <= 0 ? word.english : undefined,
  }
}
import type { AnswerResult, WordPrompt } from '../../shared/types'
import { findLearnedByUser, addLearnedWord } from '../repositories/learned-words'
import { findWordById, getWords } from '../repositories/words'
import { createRound, findActiveRound, saveRound } from '../repositories/rounds'


export type CurrentRound =
  | { done: true }
  | { done: false, prompt: WordPrompt, attemptsLeft: number }


function normalize(value: string) {
  return value.trim().toLowerCase()
}


export async function getCurrentRound(userId: number): Promise<CurrentRound> {
  const active = await findActiveRound(userId)
  if (active) {
    const word = findWordById(active.wordId)
    if (!word) throw new Error('Слово не найдено')
    return {
      done: false,
      prompt: { id: word.id, russian: word.russian },
      attemptsLeft: 3 - active.attemptsUsed,
    }
  }


  const learned = await findLearnedByUser(userId)
  const learnedIds = new Set(learned.map((item) => item.wordId))
  const available = getWords().filter((word) => !learnedIds.has(word.id))


  if (available.length === 0) return { done: true }

  const word = available[Math.floor(Math.random() * available.length)]!

  await createRound(userId, word.id)

  return {
    done: false,
    prompt: { id: word.id, russian: word.russian },
    attemptsLeft: 3,
  }
}


export async function submitAnswer(userId: number, guess: string): Promise<AnswerResult> {
  const round = await findActiveRound(userId)
  if (!round) throw new Error('Нет активной карточки')
  const word = findWordById(round.wordId)
  if (!word) throw new Error('Слово не найдено')
  const next = { ...round, attemptsUsed: round.attemptsUsed + 1 }
  if (normalize(guess) === normalize(word.english)) {
    next.status = 'correct'
    await saveRound(next)
    await addLearnedWord(userId, word.id)
    return {
      correct: true,
      attemptsLeft: 3 - next.attemptsUsed,
      revealed: true,
      english: word.english,
    }
  }


  if (next.attemptsUsed >= 3) {
    next.status = 'revealed'
    await saveRound(next)
    return {
      correct: false,
      attemptsLeft: 0,
      revealed: true,
      english: word.english,
    }
  }


  await saveRound(next)

  return {
    correct: false,
    attemptsLeft: 3 - next.attemptsUsed,
    revealed: false,
  }
}
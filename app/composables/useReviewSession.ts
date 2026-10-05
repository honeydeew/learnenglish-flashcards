import type { AnswerResult, WordPrompt } from "#shared/types";

type CurrentRound = { done: true } | { done: false, prompt: WordPrompt, attemptsLeft: number }

function errorMessage(error: unknown, fallback: string) {
  if (error && typeof error === 'object' && 'data' in error) {
    const data = (error as { data?: { message?: string, statusMessage?: string } }).data
    if (data?.message) return data.message
    if (data?.statusMessage) return data.statusMessage
  }
  return fallback
}

export function useReviewSession() {
  const prompt = useState<WordPrompt | null>('review-prompt', () => null)
  const guess = useState('review-guess', () => '')
  const attemptsLeft = useState('review-attempts', () => 3)
  const result = useState<AnswerResult | null>('review-result', () => null)
  const done = useState('review-done', () => false)
  const pending = useState('review-pending', () => false)
  const error = useState('review-error', () => '')

  function applyRound(round: CurrentRound) {
    guess.value = ''
    result.value = null
    error.value = ''
    if (round.done) {
      done.value = true
      prompt.value = null
      return
    }
    done.value = false
    prompt.value = round.prompt
    attemptsLeft.value = round.attemptsLeft
  }

  async function load() {
    pending.value = true
    error.value = ''
    try {
      applyRound(await $fetch<CurrentRound>('/api/review/current'))
    } catch (err) {
      error.value = errorMessage(err, 'Не удалось открыть карточку')
    } finally {
      pending.value = false
    }
  }

  async function submit() {
    if (pending.value || !prompt.value || result.value?.revealed) return
    pending.value = true
    error.value = ''
    try {
      const answer = await $fetch<AnswerResult>('/api/review/answer', {
        method: 'POST',
        body: {
          wordId: prompt.value.id,
          guess: guess.value,
          attemptsLeft: attemptsLeft.value,
        },
      })
      result.value = answer
      attemptsLeft.value = answer.attemptsLeft
    } catch (err) {
      error.value = errorMessage(err, 'Не удалось проверить ответ')
    } finally {
      pending.value = false
    }
  }

  function next() {
    return load()
  }

  return { prompt, guess, attemptsLeft, result, done, pending, error, load, submit, next }
}
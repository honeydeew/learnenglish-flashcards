import type { AnswerResult, WordPrompt } from "#shared/types";

type CurrentRound = | {done: true} | {done: false, prompt: WordPrompt, attemptsLeft: number}

function errorMessage(error: unknown, fallback: string) {
    if (error && typeof error === 'object' && 'data' in error) {
      const data = (error as { data?: { message?: string, statusMessage?: string } }).data
      if (data?.message) return data.message
      if (data?.statusMessage) return data.statusMessage
    }
    return fallback
  }


export function useLearnSession() {
    const prompt = useState<WordPrompt | null>('learn-prompt', () => null)
    const guess = useState('learn-guess', () => '')
    const attemptsLeft = useState('learn-attempts', () => 3)
    const result = useState<AnswerResult | null>('learn-result', () => null)
    const done = useState('learn-done', () => false)
    const pending = useState('learn-pending', () => false)
    const error = useState('learn-error', () => '')

    function applyRound(round: CurrentRound) {
        guess.value = ''
        result.value = null
        error.value = ''
        if(round.done){
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
          applyRound(await $fetch<CurrentRound>('/api/learn/current'))
        } catch (err) {
          error.value = errorMessage(err, 'Не удалось открыть карточку')
        } finally {
          pending.value = false
        }
      }


  async function submit() {
    if (pending.value || result.value?.revealed) return
    pending.value = true
    error.value = ''
    try {
      const answer = await $fetch<AnswerResult>('/api/learn/answer', {
        method: 'POST',
        body: { guess: guess.value },
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
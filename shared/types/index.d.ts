export interface PublicUser {
  id: number
  name: string
  email: string
}

export interface WordPrompt {
  id: number
  russian: string
}

export interface AnswerResult {
  correct: boolean
  attemptsLeft: number
  revealed: boolean
  english?: string
}

export interface LearnedWord {
  english: string
  russian: string
  learned: string
}

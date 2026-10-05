import { fa } from "vuetify/locale";
import type { LearnedWord } from "~~/shared/types";

export function useLearnedWords() {
    const words = useState<LearnedWord[]>('learned-words', () => [])
    const progress = useState('learned-progress', () => ({learned: 0, total: 30}))
    const pending = ref(false)
    const error = ref('')

    async function loadWords() {
        pending.value = true
        error.value = ''
        try {
            words.value = await $fetch<LearnedWord[]>('/api/me/words')
        } catch {
            error.value = 'не удалось загрузить слова'
        } finally {
            pending.value = false
        }
    }


    async function loadProgress() {
        try {
            progress.value = await $fetch<{learned: number, total: number}>('/api/me/progress')

        } catch {
            error.value = 'не удалось загрузить прогресс'
        }
    }
    return { words, progress, pending, error, loadWords, loadProgress }
}

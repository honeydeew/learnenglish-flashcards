<template>
    <main class="cabinet-page">
        <div class="cabinet-panel">
            <h1>Кабинет</h1>
            <p v-if="error" class="cabinet-error">{{error}}</p>
            <p v-else-if="pending">Загрузка...</p>
            <p v-else-if="words.length === 0">Выучиных слов нет</p>
            <LearnedWordList v-else :words="words"></LearnedWordList>
        </div>
    </main>
</template>

<script setup lang="ts">
import {LearnedWordList} from '../components/LearnedWordList'
import {onMounted} from 'vue'
import {useLearnedWords} from '../composables/useLearnedWords'

definePageMeta({middleware: 'auth'})

const {words, pending, error, loadWords} = useLearnedWords()

onMounted(loadWords)
</script>

<style scoped lang="scss" src="../styles/pages/cabinet.scss"></style>

<template>
    <main class="learn-page">
      <div class="learn-panel">
        <h1>Повторение</h1>
        <p v-if="error" class="learn-error">{{ error }}</p>
        <p v-else-if="done">Пока нет выученных слов.</p>
        <template v-else-if="prompt">
          <LearnCard :russian="prompt.russian" />
          <p class="attempts">Осталось попыток: {{ attemptsLeft }}</p>
          <AnswerForm v-model="guess" :disabled="pending || !!result?.revealed" @submit="submit" />
          <AnswerFeedback :result="result" />
          <AppButton v-if="result?.revealed" type="button" @click="next">Следующее слово</AppButton>
        </template>
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue'
  import { AnswerFeedback } from '../components/AnswerFeedback'
  import { AnswerForm } from '../components/AnswerForm'
  import { AppButton } from '../components/AppButton'
  import { LearnCard } from '../components/LearnCard'
  import {useReviewSession} from '../composables/useReviewSession'
  
  const { prompt, guess, attemptsLeft, result, done, pending, error, load, submit, next } = useReviewSession()
  
  definePageMeta({middleware: 'auth'})


  onMounted(load)

  
  </script>
  
  <style scoped lang="scss" src="../styles/pages/learn.scss"></style>
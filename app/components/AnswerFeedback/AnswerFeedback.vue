<template>
    <p v-if="result?.correct" class="feedback feedback-ok">Верно: {{ result.english }}</p>
    <p v-else-if="result?.revealed" class="feedback feedback-reveal">
      Правильный ответ: {{ result.english }}. Слово не засчитано.
    </p>
    <p v-else-if="result" class="feedback feedback-wrong">
      Неверно. Осталось попыток: {{ result.attemptsLeft }}
    </p>
  </template>
  
  <script setup lang="ts">
  import type { AnswerResult } from '../../../shared/types'
  
  defineProps<{
    result: AnswerResult | null
  }>()
  </script>
  
  <style scoped lang="scss" src="../../styles/components/AnswerFeedback.scss"></style>
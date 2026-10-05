<template>
    <ul class="learned-list">
        <li
        v-for="word in words" :key="word.english + word.learned">
        <span class="pair">{{ word.russian }} - {{ word.english }}</span>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type {LearnedWord} from '../../../shared/types'

defineProps<{
    words: LearnedWord[]
}>()


</script>
<style scoped lang="scss" src="../../styles/components/LearnedWordList.scss"></style>

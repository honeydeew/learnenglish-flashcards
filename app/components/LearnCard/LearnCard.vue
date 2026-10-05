<template>
    <article class="learn-card">
        <p class="learn-card-label">Переведите</p>
        <h2>{{ russian }}</h2>
    </article>
</template>

<script setup lang="ts">
defineProps<{
    russian: string
}>()
</script>

<style scoped lang="scss" src="../../styles/components/LearnCard.scss"></style>

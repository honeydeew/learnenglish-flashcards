<template>
    <form 
    class="answer-form"
    @submit.prevent="emit('submit')"
    >
    <label class="field">
        <span>English</span>
        <input
        type="text"
        placeholder="your answer"
        autocomplete="off"
        :disabled="disabled"
        v-model="guess"
        >
    </label>
    <AppButton type="submit" :disabled="disabled">Проверить</AppButton>
    </form>
</template>

<script setup lang="ts">
import {AppButton} from '../AppButton'

const guess = defineModel<string>({required: true})

defineProps<{
    modelValue: string,
    disabled?: boolean
}>()

const emit = defineEmits<{
    submit: []
}>()

</script>

<style scoped lang="scss" src="../../styles/components/AnswerForm.scss"></style>


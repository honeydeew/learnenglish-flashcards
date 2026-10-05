<template>
    <button :type="type" class="app-button">
        <slot />
    </button>
</template>

<script setup>
defineProps({
    type: {
        type: String,
        default: 'button'
    }
})
</script>

<style scoped lang="scss" src="../../styles/components/AppButton.scss"></style>

<template>
    <main class="home-page">
        <div class="home-body">
            <section class="home-actions">              
                <p v-if="user" class="progress">выученно {{ progress.learned }} из {{ progress.total }}</p>
                <AppButton type="button" @click="startLearn">учить слова</AppButton>
                <AppButton type="button" @click="startReview">повторение</AppButton>
            </section>
        </div>
    </main>
</template>
<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { navigateTo } from 'nuxt/app'
import { AppButton } from '../components/AppButton'
import { useAuth } from '../composables/useAuth'
import { useLearnedWords } from '../composables/useLearnedWords'

const {user} = useAuth()
const {progress, loadProgress} = useLearnedWords()

function startLearn() {
    return navigateTo(user.value ? '/learn' : '/login')
}

function startReview() {
    return navigateTo(user.value ? '/review' : '/login')
}

onMounted(() => {
    if(user.value) loadProgress()
})

watch(user, (value) => {
    if(value) loadProgress()
})

</script>

<style scoped lang="scss" src="../styles/pages/home.scss"></style>


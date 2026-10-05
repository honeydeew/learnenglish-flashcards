<template>
    <header class="app-header">
        <p class="app-header-name">{{ user?.name }}</p>
        <nav>
            <NuxtLink to="/">Меню</NuxtLink>
            <NuxtLink to="/learn">Учить</NuxtLink>
            <NuxtLink to="/review">Повторять</NuxtLink>
            <NuxtLink to="/cabinet">Профиль</NuxtLink>
            <AppButton type="button" @click="onLogout">Выйти</AppButton>
        </nav>
    </header>
</template>

<script setup lang="ts">
import {navigateTo} from 'nuxt/app'
import { useAuth } from '../../composables/useAuth'
import {AppButton} from '../../components/AppButton'

const {user, logout} = useAuth()

async function onLogout() {
    await logout()
    await navigateTo('/login')
}
</script>

<style scoped lang="scss" src="../../styles/components/AppHeader.scss"></style>


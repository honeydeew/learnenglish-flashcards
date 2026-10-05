<template>
  <v-app>
    <NuxtRouteAnnouncer />
    <AppHeader v-if="user" />
    <NuxtPage />
  </v-app>
</template>

<script setup lang="ts">
import { onServerPrefetch } from 'vue'
import { useAuth } from './composables/useAuth'
import { AppHeader } from './components/AppHeader'


const { user, fetchUser } = useAuth()

onServerPrefetch(async () => {
  await fetchUser()
})
</script>

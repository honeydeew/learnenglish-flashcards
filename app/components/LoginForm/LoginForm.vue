<template>
    <form class="login-form" @submit.prevent="onSubmit">
      <label class="field">
        <span>Email</span>
        <input v-model="email" type="email" placeholder="you@example.com" autocomplete="email" />
      </label>
      <label class="field">
        <span>Password</span>
        <div class="password-wrap">
        <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" autocomplete="current-password" />
        <button
        class="password-toggle"
        type="button"
        :aria-pressed="showPassword"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
        @click="showPassword = !showPassword"
        >{{ showPassword ? 'Hide' : 'Show' }}</button>
        </div>
      </label>
      <p v-if="error" class="form-error">{{ error }}</p>
      <AppButton type="submit">Login</AppButton>
      <p class="login-note">
        Don't have an account?
        <NuxtLink to="/register">Register</NuxtLink>
      </p>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { navigateTo } from 'nuxt/app'
  import { AppButton } from '../AppButton'
  import { useAuth } from '../../composables/useAuth'

  const showPassword = ref(false)
  
  const email = ref('')
  const password = ref('')
  const error = ref('')
  const { login } = useAuth()
  
  async function onSubmit() {
    error.value = ''
    try {
      await login({ email: email.value, password: password.value })
      await navigateTo('/')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Не удалось войти'
    }
  }
  </script>
  
  <style scoped lang="scss" src="../../styles/components/LoginForm.scss"></style>
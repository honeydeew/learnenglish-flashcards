<template>
    <form class="register-form" @submit.prevent="onSubmit">
      <label class="field">
        <span>Name</span>
        <input v-model="name" type="text" placeholder="Your name" autocomplete="name" />
      </label>
      <label class="field">
        <span>Email</span>
        <input v-model="email" type="email" placeholder="you@example.com" autocomplete="email" />
      </label>
      <label class="field">
        <span>Password</span>
        <div class="password-wrap">
        <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Create a password" autocomplete="new-password" />
        <button
        type="button"
        class="password-toggle"
        :aria-pressed="showPassword"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
        @click="showPassword = !showPassword"
        >{{ showPassword ? 'Hide' : 'Show' }}</button>
        </div>
      </label>
      <label class="field">
        <span>Confirm password</span>
        <div class="password-wrap">
        <input v-model="confirm" :type="showConfirm ? 'text' : 'password'" placeholder="Repeat your password" autocomplete="new-password" />
        <button
        class="password-toggle"
        type="button"
        :aria-pressed="showConfirm"
        :aria-label="showConfirm ? 'Hide password' : 'Show password'"
        @click="showConfirm = !showConfirm"
        >{{ showConfirm ? 'Hide' : 'Show' }}</button>
        </div>
      </label>
      <p v-if="error" class="form-error">{{ error }}</p>
      <AppButton type="submit">Create account</AppButton>
      <p class="register-note">
        Already have an account?
        <NuxtLink to="/login">Log in</NuxtLink>
      </p>
    </form>
  </template>

<script setup lang="ts">
import { AppButton } from '../AppButton';
import {ref} from 'vue'
import { useAuth } from '../../composables/useAuth'
import { navigateTo } from 'nuxt/app'


const showPassword = ref(false)
const showConfirm = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const error = ref('')
const {register} = useAuth()

async function onSubmit() {
    error.value = ''
    if(password.value !== confirm.value){
        error.value = 'пароли не совпадают'
        return
    }

    try {
        await register({
            name: name.value,
            email: email.value,
            password: password.value,
            confirm: confirm.value
        })
        await navigateTo('/login')
    } catch (err){
        error.value = err instanceof Error ? err.message : 'Не удалось зарегистрироваться'
    }
}
</script>

<style scoped lang="scss" src="../../styles/components/RegisterForm.scss"></style>

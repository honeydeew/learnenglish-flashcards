<template>
    <main class="login-page">
        <div class="login-panel">
            <h1>Login</h1>
            <LoginForm />
        </div>
    </main>
</template>

<script setup lang="ts">
import { LoginForm } from '../components/LoginForm';
</script>

<style scoped lang="scss" src="../styles/pages/login.scss"></style>

<template>
    <main class="register-page">
        <div class="register-panel">
            <div class="register-heading">
                <h1>Create account</h1>
                <p>Fill in your details to get started.</p>
            </div>
            <RegisterForm />
        </div>
    </main>
</template>

<script setup lang="ts">
import { RegisterForm } from '../components/RegisterForm';
</script>

<style scoped lang="scss" src="../styles/pages/register.scss"></style>

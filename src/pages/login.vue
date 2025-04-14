<script lang="ts" setup>
import LoginForm from "~/components/login/LoginForm.vue";
definePageMeta({ middleware: ["user-authenticated-redirect"] });
</script>

<template>
  <h1 slot="header">Log In To Provet Cloud</h1>
  <LoginForm />
  <div slot="footer">
    Don't have an account?
    <NuxtLink to="/signup">Click here to create.</NuxtLink>
  </div>
</template>

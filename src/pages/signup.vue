<script lang="ts" setup>
import "@provetcloud/css";
import SignupForm from "~/components/signup/SignupForm.vue";
definePageMeta({ middleware: ["user-authenticated-redirect"] });
</script>
<template>
  <h1 slot="header">Create Provet Cloud Account</h1>
  <SignupForm data-testid="signup-form"/>
  <div slot="footer">
    Already have an account?
    <NuxtLink to="/login">Click here to log in.</NuxtLink>
  </div>
</template>

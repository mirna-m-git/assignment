<script lang="ts" setup>
import Button from "../globals/Button.vue";
import Input from "../globals/Input.vue";

const { login } = useUserStore();

const loginForm = ref({
  email: "",
  password: "",
});
</script>
<template>
  <form @submit.prevent autocomplete="off">
    <Input label="Email" v-model="loginForm.email" />
    <Input label="Password" type="password" v-model="loginForm.password" />
    <Button class="n-margin-bs-m n-width-100" variant="primary" @click="login">Log In</Button>
  </form>
</template>

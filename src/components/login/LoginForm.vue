<script lang="ts" setup>
import { useToast } from "~/composables/toast";
import { useFormValidation } from "~/composables/validation";
import Button from "../globals/Button.vue";
import Input from "../globals/Input.vue";
import PasswordInput from "../globals/PasswordInput.vue";

const { login } = useUserStore();
const toast = useToast();
const loginForm = ref({
  email: "",
  password: "",
});
const { errors, isValid } = useFormValidation(loginForm, {
  email: [validateEmail],
  password: [(password) => (!password ? "Password is required" : null)],
});

const passwordVisible = ref(false);
const submitting = ref(false);

const onLogin = async () => {
  toast.remove();
  submitting.value = true;
  const { error } = await login(loginForm.value);
  if (error) {
    toast.error(error);
  }
  submitting.value = false;
};
</script>
<template>
  <form @submit.prevent class="login-form">
    <provet-stack gap="m">
      <Input
        label="Email"
        v-model="loginForm.email"
        :error="errors.email || undefined"
        expand
        data-testid="email"
      />
      <PasswordInput
        label="Password"
        v-model="loginForm.password"
        :error="errors.password || undefined"
      />
      <Button
        v-if="submitting"
        expand
        class="n-margin-bs-m n-width-100"
        variant="primary"
        disabled
        ><provet-spinner size="xs"></provet-spinner> Log In</Button
      >
      <Button
        v-else-if="isValid"
        expand
        class="n-margin-bs-m n-width-100"
        variant="primary"
        @click="onLogin"
        >Log In</Button
      >
      <Button
        v-else
        expand
        class="n-margin-bs-m n-width-100"
        variant="primary"
        disabled
        >Log In</Button
      >
    </provet-stack>
  </form>
</template>

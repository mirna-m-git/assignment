<script lang="ts" setup>
import Button from "../globals/Button.vue";
import Checkbox from "../globals/Checkbox.vue";
import Input from "../globals/Input.vue";
import PasswordInput from "../globals/PasswordInput.vue";

const { signup } = useUserStore();
const toast = useToast();

const userForm = ref({
  username: "",
  email: "",
  password: "",
  subscribeToUpdates: false,
});

const { errors, isValid } = useFormValidation(userForm, {
  username: [validateUsername],
  email: [validateEmail],
  password: [validatePassword],
});

const submitting = ref(false);

const onSignup = async () => {
  toast.remove();
  submitting.value = true;
  const { error } = await signup(userForm.value);
  if (error) {
    toast.error(error);
  }
  submitting.value = false;
};
</script>
<template>
  <form @submit.prevent>
    <provet-stack gap="m">
      <Input
        label="Username"
        v-model="userForm.username"
        expand
        :error="errors.username || undefined"
      />
      <Input
        label="Email"
        v-model="userForm.email"
        expand
        :error="errors.email || undefined"
      />
      <PasswordInput
        label="Password"
        v-model="userForm.password"
        :error="errors.password || undefined"
      />
      <Checkbox
        label="I want to receive updates and announcements"
        :checked="userForm.subscribeToUpdates"
        expand
        @change="userForm.subscribeToUpdates = !userForm.subscribeToUpdates"
      />
      <Button
        v-if="submitting"
        class="n-margin-bs-m n-width-100"
        variant="primary"
        disabled
        expand
        ><provet-spinner size="xs"></provet-spinner>Sign Up</Button
      >
      <Button
        class="n-margin-bs-m n-width-100"
        v-else-if="isValid"
        variant="primary"
        @click="onSignup"
        expand
        >Sign Up</Button
      >
      <Button
        class="n-margin-bs-m n-width-100"
        variant="primary"
        disabled
        expand
        v-else
        >Sign Up</Button
      >
    </provet-stack>
  </form>
</template>

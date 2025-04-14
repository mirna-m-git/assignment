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
const passwordHints = computed(() => getPasswordHints(userForm.value.password));

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
        data-testid="username"
        label="Username"
        name="username"
        v-model="userForm.username"
        expand
        :error="errors.username || undefined"
      />
      <Input
        data-testid="email"
        label="Email"
        name="email"
        v-model="userForm.email"
        expand
        type="email"
        :error="errors.email || undefined"
      />
      <PasswordInput
        data-testid="password"
        label="Password"
        name="password"
        v-model="userForm.password"
      />
      <ul class="n-padding-i-s list">
        <li
          v-for="message in Object.values(PasswordValidationMessages)"
          class="n-typescale-xs list-item"
          :class="{
            'n-color-text-success list-item-success':
              !passwordHints.includes(message),
          }"
        >
          {{ message }}
        </li>
      </ul>
      <Checkbox
        data-testid="subscribe"
        label="I want to receive updates and announcements"
        name="subscribe"
        :checked="userForm.subscribeToUpdates"
        expand
        @change="userForm.subscribeToUpdates = !userForm.subscribeToUpdates"
      />
      <Button
        v-if="submitting"
        data-testid="button"
        class="n-margin-bs-m"
        name="signup-button"
        variant="primary"
        disabled
        expand
        ><provet-spinner size="xs"></provet-spinner>Sign Up</Button
      >
      <Button
        v-else-if="isValid"
        class="n-margin-bs-m"
        data-testid="button"
        name="signup-button"
        variant="primary"
        @click="onSignup"
        expand
        >Sign Up</Button
      >
      <Button
        v-else
        class="n-margin-bs-m"
        data-testid="button"
        name="signup-button"
        variant="primary"
        disabled
        expand
        >Sign Up</Button
      >
    </provet-stack>
  </form>
</template>
<style scoped>
.list {
  list-style-type: none;
}
.list-item:before {
  content: "•";
  margin-right: 4px;
  width: 10px;
  display: inline-block;
}
.list-item-success:before {
  content: "✓";
}
</style>

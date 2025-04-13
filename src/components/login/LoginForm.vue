<script lang="ts" setup>
import { useToast } from "~/composables/toast";
import Button from "../globals/Button.vue";
import Input from "../globals/Input.vue";

const { login } = useUserStore();
const toast = useToast();

const loginForm = ref({
  email: "",
  password: "",
});
const passwordVisible = ref(false);

const onLogin = async () => {
  toast.remove();
  const { success, error } = await login(loginForm.value);
  if (success) {
    navigateTo("/");
  } else if (error) {
    toast.error(error);
  }
};
</script>
<template>
  <form @submit.prevent class="login-form">
    <Input label="Email" v-model="loginForm.email" />
    <Input
      label="Password"
      :type="passwordVisible ? 'text' : 'password'"
      v-model="loginForm.password"
    >
      <template #button>
        <provet-button
          slot="end"
          square
          @click="passwordVisible = !passwordVisible"
        >
          <provet-icon
            name="interface-edit-off"
            v-if="passwordVisible"
          ></provet-icon>
          <provet-icon name="interface-edit-on" v-else></provet-icon>
        </provet-button>
      </template>
    </Input>
    <Button class="n-margin-bs-m n-width-100" variant="primary" @click="onLogin"
      >Log In</Button
    >
  </form>
</template>

<script lang="ts" setup>
import Button from "../globals/Button.vue";
import Checkbox from "../globals/Checkbox.vue";
import Input from "../globals/Input.vue";

const { signup } = useUserStore();

const userForm = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  subscribeToUpdates: false,
});
</script>
<template>
  <form @submit.prevent autocomplete="off">
    <Input label="First Name" v-model="userForm.firstName" />
    <Input label="Last Name" v-model="userForm.lastName" />
    <Input label="Email" v-model="userForm.email" />
    <Input label="Password" type="password" v-model="userForm.password" />
    <Input label="Confirm Password" type="password" v-model="userForm.confirmPassword" />
    <Checkbox
      label="I want to receive updates and announcements"
      :checked="userForm.subscribeToUpdates"
      @change="userForm.subscribeToUpdates = !userForm.subscribeToUpdates"
    />
    <Button class="n-margin-bs-m n-width-100" variant="primary" @click="signup"
      >Sign Up</Button
    >
  </form>
</template>

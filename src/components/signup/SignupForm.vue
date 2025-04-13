<script lang="ts" setup>
import Button from "../globals/Button.vue";
import Checkbox from "../globals/Checkbox.vue";
import Input from "../globals/Input.vue";

const { signup } = useUserStore();
const toast = useToast();

const userForm = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  subscribeToUpdates: false,
});
const passwordVisible = ref(false);
const onSignup = async () => {
  toast.remove();
  const { confirmPassword, ...payload } = userForm.value;
  const { success, error } = await signup(payload);
  if (success) {
    navigateTo("/");
  } else if (error) {
    toast.error(error);
  }
};
</script>
<template>
  <form @submit.prevent>
    <Input label="First Name" v-model="userForm.firstName" />
    <Input label="Last Name" v-model="userForm.lastName" />
    <Input label="Email" v-model="userForm.email" />
    <Input label="Password" :type="passwordVisible ? 'text' : 'password'" v-model="userForm.password">
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
    <Input
      label="Confirm Password"
      type="password"
      v-model="userForm.confirmPassword"
    />
    <Checkbox
      label="I want to receive updates and announcements"
      :checked="userForm.subscribeToUpdates"
      @change="userForm.subscribeToUpdates = !userForm.subscribeToUpdates"
    />
    <Button
      class="n-margin-bs-m n-width-100"
      variant="primary"
      @click="onSignup"
      >Sign Up</Button
    >
  </form>
</template>

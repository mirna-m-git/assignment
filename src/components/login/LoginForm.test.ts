// @vitest-environment nuxt
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { it, expect, describe, vi } from "vitest";
import LoginForm from "./LoginForm.vue";

const mockLogin = vi.fn();
vi.mock("@/stores/user", () => {
  return {
    useUserStore: () => ({
      login: mockLogin,
    }),
  };
});

describe("LoginForm", () => {
  it("can mount login form component", async () => {
    const form = await mountSuspended(LoginForm);
    expect(form.html()).toMatchSnapshot();
  });
  // it("button is disabled when form is invalid", async () => {
  //   const form = await mountSuspended(SignupForm);
  // })
  // it("shows validation errors on invalid fields", async () => {
  //   const form = await mountSuspended(SignupForm);
  // })
  it("calls login method with correct parameters on button click", async () => {
    const form = await mountSuspended(LoginForm);

    // Find custom inputs by label or order
    const inputs = form.findAllComponents({ name: 'Input' });
    const emailInput = inputs[0];
    const passwordInput = inputs[1];

    await emailInput.vm.$emit('update:modelValue', 'test@example.com');
    await passwordInput.vm.$emit('update:modelValue', 'securePassword123');

    // Trigger the login button click
    const button = form.findComponent({ name: 'Button' });
    await button.vm.$emit('click');

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'securePassword123',
    });
  });
});

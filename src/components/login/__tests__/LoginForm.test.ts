// @vitest-environment nuxt
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { it, expect, describe, vi } from "vitest";
import LoginForm from "../LoginForm.vue";

const mockLogin = vi.fn(() => ({ success: true }));
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

  it("button is disabled when form is invalid", async () => {
    const form = await mountSuspended(LoginForm);
    const button = form.findComponent({ name: "Button" });
    expect(button.props().disabled).toBe(true);
    await button.vm.$emit("click");
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("shows validation errors on invalid fields", async () => {
    const form = await mountSuspended(LoginForm);
    const emailInput = form.findComponent({ name: "Input" });
    const passwordInput =  form.findComponent({ name: "PasswordInput" });

    await emailInput.vm.$emit("update:modelValue", "test@example.com");
    await passwordInput.vm.$emit("update:modelValue", "securePassword123.");

    await emailInput.vm.$emit("update:modelValue", "");
    await passwordInput.vm.$emit("update:modelValue", "");

    const button = form.findComponent({ name: "Button" });
    expect(button.props().disabled).toBe(true);

    const emailInputUpdated = form.findComponent({ name: "Input" });
    const passwordInputUpdated =  form.findComponent({ name: "PasswordInput" });
    expect(emailInputUpdated.props().error).toEqual("Email is required");
    expect(passwordInputUpdated.props().error).toEqual("Password is required");
  });

  it("calls login method with correct parameters on button click", async () => {
    const form = await mountSuspended(LoginForm);
    const emailInput = form.findComponent({ name: "Input" });
    const passwordInput =  form.findComponent({ name: "PasswordInput" });

    await emailInput.vm.$emit("update:modelValue", "test@example.com");
    await passwordInput.vm.$emit("update:modelValue", "securePassword123.");

    const button = form.findComponent({ name: "Button" });
    await button.vm.$emit("click");

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "securePassword123.",
    });
  });
});

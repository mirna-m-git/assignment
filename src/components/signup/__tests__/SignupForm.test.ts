// @vitest-environment nuxt
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { it, expect, describe, vi } from "vitest";
import SignupForm from "../SignupForm.vue";

const mockSignup = vi.fn(() => ({ success: true }));
vi.mock("@/stores/user", () => {
  return {
    useUserStore: () => ({
      signup: mockSignup,
    }),
  };
});

describe("SignupForm", () => {
  it("can mount signup form component", async () => {
    const form = await mountSuspended(SignupForm);
    expect(form.html()).toMatchSnapshot();
  });

  it("button is disabled when form is invalid", async () => {
    const form = await mountSuspended(SignupForm);
    const button = form.findComponent({ name: "Button" });
    expect(button.props().disabled).toBe(true);
    await button.vm.$emit("click");
    expect(mockSignup).not.toHaveBeenCalled();
  });

  it("shows validation errors on invalid fields", async () => {
    const form = await mountSuspended(SignupForm);

    const inputs = form.findAllComponents({ name: "Input" });
    const passwordInput = form.findComponent({ name: "PasswordInput" });
    const inputsValues = ["username", "a"];
    for (let i = 0; i < inputs.length; i++) {
      await inputs[i].vm.$emit("update:modelValue", inputsValues[i]);
    }
    await inputs[1].vm.$emit("update:modelValue", "");
    await passwordInput.vm.$emit("update:modelValue", "pass");

    const button = form.findComponent({ name: "Button" });
    expect(button.props().disabled).toBe(true);

    const inputsUpdated = form.findAllComponents({ name: "Input" });
    expect(inputsUpdated[1].props().error).toEqual("Email is required");
  });

  it("calls signup method with correct parameters on button click", async () => {
    const form = await mountSuspended(SignupForm);

    const inputs = form.findAllComponents({ name: "Input" });
    const passwordInput = form.findComponent({ name: "PasswordInput" });
    const inputsValues = ["username", "email@example.com"];
    for (let i = 0; i < inputs.length; i++) {
      await inputs[i].vm.$emit("update:modelValue", inputsValues[i]);
    }
    await passwordInput.vm.$emit("update:modelValue", "passworD123.");

    const button = form.findComponent({ name: "Button" });
    await button.vm.$emit("click");

    expect(mockSignup).toHaveBeenCalledTimes(1);
    expect(mockSignup).toHaveBeenCalledWith({
      username: "username",
      email: "email@example.com",
      password: "passworD123.",
      subscribeToUpdates: false,
    });
  });
});

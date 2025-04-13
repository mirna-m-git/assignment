// @vitest-environment nuxt
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { it, expect, describe, vi } from "vitest";
import SignupForm from "./SignupForm.vue";

const mockSignup = vi.fn();
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

  // it("button is disabled when form is invalid", async () => {
  //   const form = await mountSuspended(SignupForm);
  // })
  // it("shows validation errors on invalid fields", async () => {
  //   const form = await mountSuspended(SignupForm);
  // })
  it("calls signup method with correct parameters on button click", async () => {
    const form = await mountSuspended(SignupForm);

    const inputs = form.findAllComponents({ name: "Input" });
    const inputsValues = [
      "first name",
      "last name",
      "email@example.com",
      "password",
      "password",
    ];
    for (let i = 0; i < inputs.length; i++) {
      await inputs[i].vm.$emit('update:modelValue', inputsValues[i]);
    }

    const button = form.findComponent({ name: "Button" });
    await button.vm.$emit("click");

    expect(mockSignup).toHaveBeenCalledTimes(1);
    expect(mockSignup).toHaveBeenCalledWith({
      firstName: "first name",
      lastName: "last name",
      email: "email@example.com",
      password: "password",
      subscribeToUpdates: false,
    });
  });
  // it("shows toast error on api error", async () => {
  //   const form = await mountSuspended(SignupForm);
  // })
});

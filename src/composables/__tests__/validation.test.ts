import { describe, it, expect } from "vitest";
import { ref, nextTick } from "vue";
import { useFormValidation } from "../validation";

const required = (value: string) => (!value ? "Required" : null);
const minLength = (min: number) => (value: string) =>
  value.length < min ? `Min ${min} characters` : null;

describe("useFormValidation", () => {
  it("returns initial silentErrors and isValid state", () => {
    const form = ref({ email: "", password: "" });

    const { silentErrors, errors, isValid } = useFormValidation(form, {
      email: [required],
      password: [required, minLength(6)],
    });

    expect(errors.value.email).toBe(undefined);
    expect(errors.value.password).toBe(undefined);

    expect(silentErrors.value.email).toBe("Required");
    expect(silentErrors.value.password).toBe("Required");

    expect(isValid.value).toBe(false);
  });

  it("updates errors and isValid on form changes", async () => {
    const form = ref({ email: "", password: "" });

    const { errors, isValid } = useFormValidation(form, {
      email: [required],
      password: [required, minLength(6)],
    });

    expect(errors.value.email).toBe(undefined);
    expect(errors.value.password).toBe(undefined);

    form.value.email = "test@example.com";
    form.value.password = "123"; // still too short
    await nextTick();

    expect(errors.value.email).toBe(null);
    expect(errors.value.password).toBe("Min 6 characters");
    expect(isValid.value).toBe(false);

    form.value.password = "123456";
    await nextTick();

    expect(errors.value.password).toBe(null);
    expect(isValid.value).toBe(true);
  });
});

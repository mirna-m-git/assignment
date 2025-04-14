import { ref, watch, computed } from "vue";

type ValidatorFn<T> = (value: T, form?: any) => string | null;

type FieldValidators<T> = {
  [K in keyof T]?: ValidatorFn<T[K]>[];
};

export function useFormValidation<T extends Record<string, any>>(
  form: Ref<T>,
  validators: FieldValidators<T>
) {
  const errors = ref<Record<keyof T, string | null>>(
    {} as Record<keyof T, string | null>
  );
  const silentErrors = ref<Record<keyof T, string | null>>(
    {} as Record<keyof T, string | null>
  );

  const validateKey = (key: string, value: T[string]) => {
    const fieldValidators = validators[key];
    if (fieldValidators?.length) {
      for (const validate of fieldValidators) {
        const error = validate(value, form.value);
        if (error) {
          return error;
        }
      }
    }
    return null;
  };
  for (const key in validators) {
    const error = validateKey(key, form.value[key]);
    silentErrors.value[key] = error;
    watch(
      () => form.value[key],
      (value) => {
        silentErrors.value[key] = validateKey(key, value);
        errors.value[key] = validateKey(key, value);
      }
    );
  }

  const isValid = computed(() => {
    return Object.values(silentErrors.value).every((error) => error === null);
  });

  return {
    errors,
    silentErrors,
    isValid,
  };
}

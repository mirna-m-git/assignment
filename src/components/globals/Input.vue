<script lang="ts" setup>
type InputType =
  | "text"
  | "email"
  | "password"
  | "tel"
  | "url"
  | "search"
  | "number"
  | "unit"
  | "button";
interface Props {
  type?: InputType;
  label?: string;
  modelValue: any;
  error?: string;
}
defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
const onInput = (event: Event) => {
  const target = event.currentTarget as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
<template>
  <provet-input
    :label="label"
    :type="type"
    :value="modelValue"
    :error="error"
    @input="onInput"
  >
  </provet-input>
</template>

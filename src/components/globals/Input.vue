<script lang="ts" setup>
import "@provetcloud/web-components/lib/Input";
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
    @input="onInput"
  >
    <slot name="button"></slot>
  </provet-input>
</template>

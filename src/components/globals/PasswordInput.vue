<script lang="ts" setup>
interface Props {
  label?: string;
  modelValue: any;
  error?: string;
}

defineProps<Props>();

const passwordVisible = ref(false);

const emit = defineEmits(["update:modelValue"]);
const onInput = (event: Event) => {
  const target = event.currentTarget as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
<template>
  <provet-input
    :label="label"
    :type="passwordVisible ? 'text' : 'password'"
    :value="modelValue"
    :error="error"
    expand
    @input="onInput"
  >
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
  </provet-input>
  <slot name="hint"></slot>
</template>

<script lang="ts" setup>
import "@provetcloud/web-components/lib/Button";
type ButtonVariant = "primary" | "default" | "danger" | "dashed" | "plain";

interface Props {
  variant?: ButtonVariant;
  label?: string;
  disabled?: boolean;
}
defineProps<Props>();
</script>
<template>
  <provet-button :label="label" :variant="variant" :disabled="disabled"
    ><slot></slot
  ></provet-button>
</template>

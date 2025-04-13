<script lang="ts" setup>
import "@provetcloud/web-components/lib/Checkbox";

interface Props {
  checked?: boolean;
  label?: string;
}
defineProps<Props>();
</script>
<template>
  <provet-checkbox
    :checked="checked"
    type="checkbox"
    :label="label"
  ></provet-checkbox>
</template>

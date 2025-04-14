<script lang="ts" setup>

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

<script setup lang="ts">
import Header from '~/components/header/Header.vue';
</script>

<template>
  <provet-layout id="logged-in">
    <Header />
    <slot></slot>
  </provet-layout>
</template>

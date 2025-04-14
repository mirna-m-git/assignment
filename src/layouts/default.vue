<script setup lang="ts"></script>

<template>
  <provet-layout id="default">
    <provet-stack style="max-width: 380px; margin: var(--n-space-xl) auto">
      <provet-card class="" size="s">
        <slot></slot>
      </provet-card>
    </provet-stack>

    <provet-toast-group data-testid="toast-group" />
  </provet-layout>
</template>

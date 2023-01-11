<script setup>
  import { useLayoutStore } from '@/stores/LayoutStore';
  const layoutStore = useLayoutStore();
</script>

<template>
  <div v-if="layoutStore.isLoading" id="loader-wrapper">
    <v-progress-circular
      color="primary"
      indeterminate
      :size="128"
      :width="12" />
  </div>
</template>

<style lang="scss">
  #loader-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    width: 100%;
  }
</style>

<script setup>
  import { useLayoutStore } from '@/stores/LayoutStore';
  const layoutStore = useLayoutStore();

  const toggleMode = () => {
    layoutStore.setEditMode(layoutStore.isEditMode ? false : true);
  };
</script>

<template>
  <v-btn
    variant="tonal"
    size="large"
    icon
    color="info"
    @click="toggleMode">
    <v-icon>{{ layoutStore.isEditMode ? 'mdi-pencil-off' : 'mdi-pencil' }}</v-icon>
  </v-btn>
</template>

<style lang="scss">
  #status-msg {
    margin-bottom: 10px;
  }
</style>

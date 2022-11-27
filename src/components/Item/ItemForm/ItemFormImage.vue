<script setup>
  import { useImageStore } from '@/stores/ImageStore';
  const imageStore = useImageStore();
</script>

<template>
  <v-img
    v-if="imageStore.getImageUrl"
    max-height="300"
    aspect-ratio="1"
    :src="imageStore.getImageUrl" />
</template>

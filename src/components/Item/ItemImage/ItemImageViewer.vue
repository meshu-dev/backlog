<script setup>
  import { useImageStore } from '@/stores/ImageStore';

  const imageStore = useImageStore();

  const emit = defineEmits(['closeDialog']);

  const onAddImageClick = () => {
    imageStore.setImageUrl(imageStore.getViewerImageUrl);
    imageStore.clearSearchResults();
    imageStore.setViewerImageUrl(null);

    emit('closeDialog');
  };
</script>

<template>
  <div
    v-if="imageStore.getViewerImageUrl"
    id="image-viewer">
    <v-img
      max-height="500"
      aspect-ratio="1"
      :src="imageStore.getViewerImageUrl" />
    <div id="image-viewer-btnwrapper">
      <v-btn
        id="item-addimage-btn"
        color="success"
        type="button"
        variant="elevated"
        @click="onAddImageClick">
        Use Image
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss">
  #image-viewer {
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    #image-viewer-btnwrapper {
      display: flex;
      justify-content: center;
    }
  }
</style>

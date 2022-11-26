<script setup>
  import { ref } from 'vue';
  import ItemImageSearch from '@/components/Item/ItemImage/ItemImageSearch.vue';
  import ItemImageViewer from '@/components/Item/ItemImage/ItemImageViewer.vue';

  const isDialogVisible = ref(false);

  const openDialog = () => {
    isDialogVisible.value = true;
  }

  const closeDialog = () => {
    isDialogVisible.value = false;
  }

  defineExpose({
    openDialog
  });
</script>

<template>
  <v-dialog
    id="image-search-dialog"
    v-model="isDialogVisible">
    <v-card>
      <v-card-title class="text-h5">
        Add image
      </v-card-title>
      <v-container id="image-search-content">
        <ItemImageSearch />
        <div id="image-search-imageview">
          <ItemImageViewer v-on:closeDialog="closeDialog" />
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
  #image-search-dialog {
    width: 800px;
    min-height: 600px;

    #image-search-content {
      display: flex;
      flex-direction: row;
      column-gap: 20px;

      #image-search-imageview {
        width: 100%;
      }
    }
  }
</style>

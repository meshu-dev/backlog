<script setup>
  import { useLayoutStore } from '@/stores/LayoutStore';
  import { useItemStore } from '@/stores/ItemStore';

  const layoutStore = useLayoutStore();
  const itemStore = useItemStore();

  const props = defineProps({
    item: Object
  });

  const goToEditPage = (itemId) => {
    console.log('itemId', itemId);
  };

  const showDeleteDialog = (itemId) => {
    console.log('itemId', itemId);
    layoutStore.toggleDeleteDialog(true);
  };
</script>

<template>
  <v-col cols="5">
    <v-card
      theme="dark"
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="text-h5">
            {{ item.name }}
          </v-card-title>
          <v-card-subtitle>Foster the People</v-card-subtitle>
          <v-card-actions>
            <v-btn
              class="ml-2"
              variant="outlined"
              size="small"
              v-on:click="() => { goToEditPage(item.id) }">
              Edit
            </v-btn>
            <v-btn
              class="ml-2"
              variant="outlined"
              size="small"
              v-on:click="() => { showDeleteDialog(item.id) }">
              Delete
            </v-btn>
          </v-card-actions>
        </div>
        <v-avatar
          class="ma-3"
          size="200"
          rounded="0"
        >
          <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img> -->
          <v-img src="https://m.media-amazon.com/images/M/MV5BZGU2OGY5ZTYtMWNhYy00NjZiLWI0NjUtZmNhY2JhNDRmODU3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"></v-img>
        </v-avatar>
      </div>
    </v-card>
  </v-col>
</template>

<style lang="scss">
  #category-selector {
    display: flex;

    label {
      margin: 15px 20px 0 0;
    }

    .v-select {
      max-width: 250px;
    }
  }
</style>

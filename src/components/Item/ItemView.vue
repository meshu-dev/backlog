<script setup>
  import router from '@/router';
  import { useLayoutStore } from '@/stores/LayoutStore';
  import { useItemStore } from '@/stores/ItemStore';
  import { useCategorySelectStore } from '@/stores/CategorySelectStore';

  const layoutStore = useLayoutStore();
  const itemStore = useItemStore();
  const categorySelectStore = useCategorySelectStore();

  /*
  const props = defineProps({
    item: Object
  }); */

  const goToEditPage = (itemId) => {
    itemStore.setSelectedItem(itemId);
    router.push(`/item/${itemId}`);
  };

  const showDeleteDialog = (itemId) => {
    itemStore.setSelectedItem(itemId);
    layoutStore.toggleDeleteDialog(true);
  };
</script>

<template>
  <v-col>
    <v-card theme="dark">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div class="item-view-text">
          <v-card-title class="text-h5">
            {{ item.name }}
          </v-card-title>
          <v-card-subtitle v-if="categorySelectStore.isAllOption">
            <v-chip>{{ item.category.name }}</v-chip>
          </v-card-subtitle>
          <v-card-actions v-if="layoutStore.isEditMode">
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
          rounded="0">
          <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img> -->
          <v-img src="https://m.media-amazon.com/images/M/MV5BZGU2OGY5ZTYtMWNhYy00NjZiLWI0NjUtZmNhY2JhNDRmODU3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"></v-img>
        </v-avatar>
      </div>
    </v-card>
  </v-col>
</template>

<style lang="scss">
  .v-col {
    .v-card {
      border-radius: 12px;
      
      .item-view-text {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
    } 
  }
</style>

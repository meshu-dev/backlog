<script setup>
  import { onMounted } from 'vue';
  import { useCategoryStore } from '@/stores/CategoryStore';
  import { useItemStore } from '@/stores/ItemStore';
  import ItemView from '@/components/Item/ItemView.vue';
  import ItemDeleteDialog from '@/components/Item/ItemDeleteDialog.vue';

  const categoryStore = useCategoryStore();
  const itemStore = useItemStore();

  const getItems = () => {
    return itemStore.getItemsByCategoryId(
      categoryStore.getCategoryId
    );
  };
  
  onMounted(async () => {
    await itemStore.fetchItems();
  });
</script>

<template>
  <div id="item-list">
    <ItemView
      v-for="item in getItems()"
      :key="item.id"
      :item="item" />
  </div>
  <div v-if="getItems().length == 0">
    No items available for selected category
  </div>
  <ItemDeleteDialog />
</template>

<style lang="scss">
  @import "@/assets/variables";

  #item-list {
    display: flex;
    flex-wrap: wrap;

    .v-col {
      width: 335px;
      max-width: 335px;
    }
  }

  @media screen and (max-width: $content-width) {
    #item-list {
      .v-col {
        width: 100%;
        max-width: 100%;
      }
    }
  }
</style>

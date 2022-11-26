<script setup>
  import { toRaw, onMounted } from 'vue';
  import { useCategoryStore } from '@/stores/CategoryStore';
  import { useItemStore } from '@/stores/ItemStore';
  import ItemView from '@/components/Item/ItemView.vue';
  import ItemDeleteDialog from '@/components/Item/ItemDeleteDialog.vue';

  const categoryStore = useCategoryStore();
  const itemStore = useItemStore();

  const getItems = () => {
    const items = itemStore.getItemsByCategoryId(categoryStore.getCategoryId);
    //console.log('ITEMS', items);
    
    return items;
  };
  
  onMounted(async () => {
    await itemStore.fetchItems();
  });
</script>

<template>
  <div id="item-list">
    <ItemView
      v-for="item in getItems()"
      v-if="item"
      :key="item.id"
      :item="item" />
  </div>
  <div v-if="getItems().length == 0">
    No items available for selected category
  </div>
  <ItemDeleteDialog />
</template>

<style lang="scss">
  #item-list {
    display: flex;
    flex-wrap: wrap;
  }
</style>

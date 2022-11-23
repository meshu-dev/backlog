<script setup>
  import { onMounted } from 'vue';
  import { useLayoutStore } from '@/stores/LayoutStore';
  import { useCategoryStore } from '@/stores/CategoryStore';
  import { useItemStore } from '@/stores/ItemStore';
  import ItemView from '@/components/Item/ItemView.vue';
  import ItemList from '@/components/Item/ItemList.vue';
  import ItemDeleteDialog from '@/components/Item/ItemDeleteDialog.vue';

  const layoutStore = useLayoutStore();
  const categoryStore = useCategoryStore();
  const itemStore = useItemStore();

  const getItems = () => {
    return itemStore.getItemsByCategoryId(categoryStore.getCategoryId);
  };
  
  onMounted(async () => {
    await itemStore.fetchItems();
  });
</script>

<template>
  <div id="item-list">
    <ItemView
      v-for='item in getItems()'
      :key='item.id'
      :item='item' />
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

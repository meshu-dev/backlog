<script setup>
  import { onMounted } from 'vue';
  import { useCategoryStore } from '@/stores/CategoryStore';
  import { useItemStore } from '@/stores/ItemStore';
  import CategorySelector from '@/components/Category/CategorySelector.vue';

  const categoryStore = useCategoryStore();
  const itemStore = useItemStore();
  
  onMounted(async () => {
    await itemStore.fetchItems();
  });
</script>

<template>
  <CategorySelector />
  <ul>
    <li v-for='item in itemStore.getItems' :key='item'>
      {{ item }}
    </li>
  </ul>
  <ul style="margin-top: 100px">
    <li v-for='item in itemStore.getItemByCategory("Test Category 4")' :key='item'>
      {{ item }}
    </li>
  </ul>
</template>

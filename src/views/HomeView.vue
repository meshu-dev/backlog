<script setup>
  import { onMounted } from 'vue';
  import { useCategoryStore } from '@/stores/CategoryStore';
  import { useItemStore } from '@/stores/ItemStore';
  import Layout from '@/components/Layout/Layout.vue';
  import CategorySelector from '@/components/Category/CategorySelector.vue';
  import ItemList from '@/components/Item/ItemList.vue';

  const categoryStore = useCategoryStore();
  const itemStore = useItemStore();
  
  onMounted(async () => {
    await itemStore.fetchItems();
  });
</script>

<template>
  <Layout>
    <template v-slot:main>
      <CategorySelector />
      <ItemList />
      <!-- 
      <ul>
        <li v-for='item in itemStore.getItems' :key='item'>
          {{ item }}
        </li>
      </ul>
      <ul style="margin-top: 100px">
        <li v-for='item in itemStore.getItemByCategory("Test Category 4")' :key='item'>
          {{ item }}
        </li>
      </ul> -->
    </template>
  </Layout>
</template>

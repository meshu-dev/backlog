<script setup>
  import { onMounted } from 'vue';
  import { useItemStore } from '@/stores/ItemStore';
  import Layout from '@/components/Layout/Layout.vue';
  import CategorySelector from '@/components/Category/CategorySelector.vue';
  import EditButton from '@/components/Home/EditButton.vue';
  import ItemList from '@/components/Item/ItemList.vue';

  onMounted(async () => {
    const itemStore = useItemStore();
    await itemStore.fetchItems();
  });
</script>

<template>
  <Layout>
    <template v-slot:main>
      <div id="home-header">
        <CategorySelector />
        <EditButton />
      </div>
      <ItemList />
    </template>
  </Layout>
</template>

<style lang="scss">
  @import "@/assets/variables";

  #home-header {
    display: flex;
    justify-content: space-between;
    margin: 0 $content-gap;
  }
</style>

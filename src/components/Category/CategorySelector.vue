<script setup>
  import { ref, onMounted } from 'vue';
  import { useCategoryStore } from '@/stores/CategoryStore';

  const categoryStore = useCategoryStore();
  const selectedCategory = ref(categoryStore.getSelectedOption);

  const onCategoryChange = (data) => {
    console.log('data', data);
    categoryStore.setSelectedOption(data);
    categoryStore.setSelectedCategory(data.value);
  };

  onMounted(async () => {
    await categoryStore.fetchCategories();
  });
</script>

<template>
  <div id="category-selector">
    <label>Select Category:</label>
    <v-select
      v-if="categoryStore.getTotal > 0"
      v-model="selectedCategory"
      :items="categoryStore.getCategoryOptions"
      item-title="text"
      item-value="value"
      return-object
      single-line
      @update:modelValue="onCategoryChange">
    </v-select>
  </div>
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

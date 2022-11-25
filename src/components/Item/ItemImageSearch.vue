<script setup>
  import { ref } from 'vue';
  import { useImageStore } from '@/stores/ImageStore';

  const imageStore = useImageStore();

  const isFormVisible = ref(false);
  const valid = ref(null);
  const searchTerm = ref('');

  const onAddImageClick = () => {
    console.log('onAddImageClick');

    //imageStore.setFormVisiblity(imageStore.isFormVisible ? false : true);
    isFormVisible.value = isFormVisible.value ? false : true;
  };

  const onSearchClick = async () => {
    console.log('searchTerm', searchTerm.value);
    await imageStore.search(searchTerm.value);
  };

  /*
  const props = defineProps({
    item: Object
  });

  const goToEditPage = (itemId) => {
    itemStore.setSelectedItem(itemId);
    router.push(`/item/${itemId}`);
  };

  const showDeleteDialog = (itemId) => {
    itemStore.setSelectedItem(itemId);
    layoutStore.toggleDeleteDialog(true);
  }; */
</script>

<template>
  <v-btn
    id="item-addimage-btn"
    color="success"
    type="button"
    variant="elevated"
    :disabled="isFormVisible"
    @click="onAddImageClick">
    Add image
  </v-btn>
  <v-form
    v-if="isFormVisible"
    v-model="valid">
    <v-text-field
      v-model="searchTerm"
      label="Search title"
    ></v-text-field>
    <v-btn
      id="item-addimage-btn"
      color="success"
      type="button"
      variant="elevated"
      @click="onSearchClick">
      Search
    </v-btn>
  </v-form>
  <div v-for='searchResult in imageStore.getSearchResults'>
    <v-card
      width="400"
      :title="searchResult['Title']" />
  </div>
</template>

<style lang="scss">

</style>

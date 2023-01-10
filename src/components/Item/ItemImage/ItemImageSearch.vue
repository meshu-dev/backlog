<script setup>
  import { ref } from 'vue';
  import { useImageStore } from '@/stores/ImageStore';

  const imageStore = useImageStore();

  const searchTerm = ref('');
  const isSearchLoading = ref(false);

  const onSearchClick = async () => {
    isSearchLoading.value = true;
    await imageStore.search(searchTerm.value);
    isSearchLoading.value = false;
  };

  const onSearchResultClick = (imdbID) => {
    let entry = imageStore.getSearchResultEntry(imdbID);
    imageStore.setViewerImageUrl(entry['Poster']);
  };
</script>

<template>
  <div>
    <v-form id="image-search-form">
      <v-text-field
        v-model="searchTerm"
        label="Search title" />
      <v-btn
        id="item-addimage-btn"
        color="secondary"
        variant="flat"
        :loading="isSearchLoading"
        @click="onSearchClick">
        Search
      </v-btn>
    </v-form>
    <div id="image-searchresults">
      <v-card
        v-for='searchResult in imageStore.getSearchResults'
        :key="searchResult['imdbID']"
        width="400"
        link="true"
        :title="searchResult['Title']"
        @click="(() => onSearchResultClick(searchResult['imdbID']))" />
    </div>
  </div>
</template>

<style lang="scss">
  @import "@/assets/variables";

  #image-search-form {
    width: 400px;
    margin-bottom: 20px;
  }

  #image-searchresults {
    display: flex;
    row-gap: 20px;
    flex-direction: column;
    margin-bottom: 20px;
  }

  @media screen and (max-width: $image-dialog-width) {
    #image-search-form {
      width: 100%;
    }
  }
</style>

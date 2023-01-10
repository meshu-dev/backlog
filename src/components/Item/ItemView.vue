<script setup>
  import router from '@/router';
  import { useLayoutStore } from '@/stores/LayoutStore';
  import { useItemStore } from '@/stores/ItemStore';
  import { useCategorySelectStore } from '@/stores/CategorySelectStore';

  const layoutStore = useLayoutStore();
  const itemStore = useItemStore();
  const categorySelectStore = useCategorySelectStore();

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
  };

  const getImage = (item) => {
    const apiUrl = import.meta.env.VITE_BACKLOG_API_URL;
    return item.imageUrl ? item.imageUrl : `${apiUrl}/images/poster-holder.jpg`;
  };
</script>

<template>
  <v-col class="item-view">
    <v-card>
      <div class="d-flex flex-no-wrap justify-space-between">
        <div class="item-view-text">
          <v-card-title class="text-h5">
            {{ item.name }}
          </v-card-title>
          <v-card-subtitle v-if="categorySelectStore.isAllOption">
            <v-chip variant="outlined">{{ item.category.name }}</v-chip>
          </v-card-subtitle>
          <v-card-actions v-if="layoutStore.isEditMode">
            <v-btn
              class="ml-2"
              color="primary"
              variant="flat"
              size="small"
              v-on:click="() => { goToEditPage(item.id) }">
              Edit
            </v-btn>
            <v-btn
              class="ml-2"
              color="primary"
              variant="flat"
              size="small"
              v-on:click="() => { showDeleteDialog(item.id) }">
              Delete
            </v-btn>
          </v-card-actions>
        </div>
        <v-avatar
          class="ma-3"
          rounded="0">
          <v-img :src="getImage(item)">
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  indeterminate
                  color="grey-lighten-4"
                ></v-progress-circular>
              </div>
            </template>
          </v-img>
        </v-avatar>
      </div>
    </v-card>
  </v-col>
</template>

<style lang="scss">
  @import "@/assets/variables";

  .item-view {
    .v-card {
      background-color: $panel-bgcolor;
      border-radius: 12px;
      
      .item-view-text {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 155px;
      }

      .v-card-subtitle {
        span {
          color: #000;
        }
      }

      .v-avatar {
        width: 130px;
        height: 200px;
      }
    } 
  }

  @media screen and (max-width: $content-width) {
    .item-view {
      .v-card {
        border-radius: 12px;
        
        .item-view-text {
          width: 100%;
        }
      }
    }
  }
</style>

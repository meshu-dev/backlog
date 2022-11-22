<script setup>
  import { onMounted } from 'vue';
  import { useLayoutStore } from '@/stores/LayoutStore';
  import { useItemStore } from '@/stores/ItemStore';
  import ItemView from '@/components/Item/ItemView.vue';
  import CategorySelector from '@/components/Category/CategorySelector.vue';
  import ItemList from '@/components/Item/ItemList.vue';

  const layoutStore = useLayoutStore();
  const itemStore = useItemStore();
  
  const closeDialog = () => {
    layoutStore.toggleDeleteDialog(false);
  };

  onMounted(async () => {
    await itemStore.fetchItems();
  });
</script>

<template>
  <div class="text-center">
    <v-dialog
      v-model="layoutStore.isDeleteDialogVisible"
    >
      <v-card>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            block
            @click="closeDialog">
            Close Dialog
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss">
  #item-list {
    display: flex;
  }
</style>

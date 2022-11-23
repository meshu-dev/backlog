<script setup>
  import { onMounted } from 'vue';
  import { useLayoutStore } from '@/stores/LayoutStore';
  import { useItemStore } from '@/stores/ItemStore';

  const layoutStore = useLayoutStore();
  const itemStore = useItemStore();
  
  const deleteItem = async () => {
    if (itemStore.getItem) {
      const result = await itemStore.deleteItem(itemStore.getItem.id);
      console.log('RESULT', result);
      closeDialog();
    }
  };

  const closeDialog = () => {
    layoutStore.toggleDeleteDialog(false);
  };

  onMounted(async () => {
    await itemStore.fetchItems();
  });
</script>

<template>
  <div>
    <v-dialog
      id="item-delete-dialog"
      v-model="layoutStore.isDeleteDialogVisible"
    >
      <v-card>
        <v-card-title class="text-h5">
          Delete Item?
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete the 
          item named "{{ itemStore.getItem.name }}"?
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            variant="tonal"
            @click="deleteItem">
            Yes
          </v-btn>
          <v-btn
            color="primary"
            variant="tonal"
            @click="closeDialog">
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss">
  #item-delete-dialog {
    max-width: 400px;

    .v-card-actions {
      display: flex;
      justify-content: center;
    }
  }
</style>

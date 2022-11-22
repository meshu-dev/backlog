import { defineStore } from 'pinia';

export const useLayoutStore = defineStore({
  id: 'layout',
  state: () => ({
    showDeleteDialog: false
  }),
  getters: {
    isDeleteDialogVisible(state) {
      return state.showDeleteDialog;
    }
  },
  actions: {
    toggleDeleteDialog(isVisible) {
      this.showDeleteDialog = isVisible;
    }
  }
});

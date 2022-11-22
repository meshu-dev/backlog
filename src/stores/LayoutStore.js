import { defineStore } from 'pinia';

const allOption = { text: 'All', value: 0 };

export const useLayoutStore = defineStore({
  id: 'layout',
  state: () => ({
    dropdownAllOption: allOption,
    showDeleteDialog: false
  }),
  getters: {
    getDropdownAllOption(state) {
      return state.dropdownAllOption;
    },
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

import { defineStore } from 'pinia';

const allOption = { text: 'All', value: 0 };
const statusMsgTime = 10000; // 10 Seconds

export const useLayoutStore = defineStore({
  id: 'layout',
  state: () => ({
    statusMsg: null,
    dropdownAllOption: allOption,
    showDeleteDialog: false
  }),
  getters: {
    getDropdownAllOption(state) {
      return state.dropdownAllOption;
    },
    isDeleteDialogVisible(state) {
      return state.showDeleteDialog;
    },
    getStatusMsg(state) {
      return state.statusMsg;
    }
  },
  actions: {
    toggleDeleteDialog(isVisible) {
      this.showDeleteDialog = isVisible;
    },
    setStatusMsg(statusMsg) {
      this.statusMsg = statusMsg;

      setTimeout(() => {
        this.statusMsg = null;
      }, statusMsgTime);
    },
  }
});

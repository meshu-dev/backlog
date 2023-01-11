import { defineStore } from 'pinia';

const statusMsgTime = 10000; // 10 Seconds

export const useLayoutStore = defineStore({
  id: 'layout',
  state: () => ({
    loaderStatus: false,
    statusMsg: null,
    editMode: false,
    showDeleteDialog: false
  }),
  getters: {
    isLoading(state) {
      return state.loaderStatus;
    },
    getStatusMsg(state) {
      return state.statusMsg;
    },
    isEditMode(state) {
      return state.editMode;
    },
    isDeleteDialogVisible(state) {
      return state.showDeleteDialog;
    }
  },
  actions: {
    setLoadingStatus(isLoading) {
      this.loaderStatus = isLoading;
    },
    setStatusMsg(type, text) {
      this.statusMsg = {
        type: type,
        text: text
      };

      setTimeout(() => {
        this.statusMsg = null;
      }, statusMsgTime);
    },
    clearStatusMsg() {
      this.statusMsg = null;
    },
    setEditMode(isEditMode) {
      this.editMode = isEditMode;
    },
    toggleDeleteDialog(isVisible) {
      this.showDeleteDialog = isVisible;
    }
  }
});

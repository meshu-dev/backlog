import { toRaw } from 'vue';
import { defineStore } from 'pinia';
import { callApi } from '../helpers/store';
import { itemService } from '../helpers/api';

export const useItemStore = defineStore({
  id: 'items',
  state: () => ({
    items: [],
    item: null,
    pageLimit: 10,
    isFetching: false
  }),
  getters: {
    getItems(state) {
      return state.items;
    },
    getItemById(state) {
      return (id) => {
        if (!id) {
          return null;
        }
        const rows = state.items.filter((item) => {
          return item.id == id
        });
        const item = rows[0] ? toRaw(rows[0]) : null;
        return item;
      };
    },
    getItemsByCategoryId(state) {
      return (categoryId) => {
        if (!categoryId) {
          return this.items;
        }

        return state.items.filter((item) => {
          return item.category.id == categoryId
        });
      };
    },
    getItemByCategory(state) {
      return (category) => {
        if (!category || category === 'All') {
          return this.getItems(state);
        }

        return state.items.filter((item) => {
          return item.category.name == category
        });
      };
    },
    getItem(state) {
      return state.item;
    },
    getTotal(state) {
      return state.items.length;
    },
    getPageLimit(state) {
      return state.pageLimit;
    }
  },
  actions: {
    async fetchItems() {
      if (this.items.length > 0 || this.isFetching === true) {
        return false;
      }

      this.isFetching = true;

      const apiFtn = async () => {
        const result = await itemService.getAll();
        this.items = result['data'] ?? [];

        return result;
      };

      const result = await callApi(apiFtn);
      this.isFetching = false;

      return result;
    },
    async addItem(params) {
      let result = null;

      const apiFtn = async () => {
        result = await itemService.add(params);
        const item = result['data'] ?? null;
  
        this.items.push(item);
        this.reorderItems();

        this.item = null;
      };

      await callApi(apiFtn);
      return result;
    },
    async editItem(id, params) {
      let result = null;

      const apiFtn = async () => {
        result = await itemService.edit(id, params);
        const item = result['data'] ?? null;
  
        this.replaceItemInList(item);
        this.reorderItems();
        
        this.item = null;
      };

      await callApi(apiFtn);
      return result;
    },
    async deleteItem(id, params) {
      let result = null;

      const apiFtn = async () => {
        result = await itemService.delete(id);
        this.deleteItemFromList(id);
      };

      await callApi(apiFtn);
      return result;
    },
    setSelectedItem(id) {
      for (const item of this.items) {
        if (item.id == id) {
          this.item = item;
          return;
        }
      }
      this.item = null;

      return true;
    },
    replaceItemInList(item) {
      for (let itemKey in this.items) {
        const currentItem = this.items[itemKey];

        if (currentItem.id == item.id) {
          this.items[itemKey] = item;
          return true;
        }
      }
      return false;
    },
    reorderItems() {
      const reorderedItems = this.items.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      this.items = reorderedItems;
    },
    deleteItemFromList(id) {
      const filteredItems = this.items.filter((item) => {
        return item.id != id
      });

      this.items = filteredItems;
    }
  }
});

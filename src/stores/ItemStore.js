import { toRaw } from 'vue';
import { defineStore } from 'pinia';
import { itemService } from '../helpers/api';

export const useItemStore = defineStore({
  id: 'items',
  state: () => ({
    items: [],
    item: null,
    total: 0,
    pageLimit: 10
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
      return state.total;
    },
    getPageLimit(state) {
      return state.pageLimit;
    }
  },
  actions: {
    async fetchItems() {
      const result = await itemService.getAll();
      this.items = result['data'] ?? [];

      return true;
    },
    async addItem(params) {
      const result = await itemService.add(params);
      const item = result['data'] ?? null;

      this.items.push(item);
      this.item = null;

      return true;
    },
    async editItem(id, params) {
      const result = await itemService.edit(id, params);
      const item = result['data'] ?? null;

      this.replaceItemInList(item);
      this.item = null;

      return true;
    },
    async deleteItem(id, params) {
      const result = await itemService.delete(id);
      console.log('item', result);

      this.deleteItemFromList(id);

      return true;
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
    deleteItemFromList(id) {
      for (let itemKey in this.items) {
        const currentItem = this.items[itemKey];

        if (currentItem.id == id) {
          delete this.items[itemKey];
          return true;
        }
      }
      return false;
    }
  }
});

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
      const apiItems = await itemService.getAll();
      this.items = apiItems['data'] ?? [];

      // console.log('items', this.items);
    },
    async addItem(params) {
      const item = await itemService.add(params);
      console.log('item', item);

      return true;
    },
    async editItem(id, params) {
      const item = await itemService.edit(id, params);
      console.log('item', item);

      return true;
    },
    async deleteItem(id, params) {
      const result = await itemService.delete(id);
      console.log('item', result);
    },
    setSelectedItem(id) {
      for (const item of this.items) {
        if (item.id == id) {
          this.item = item;
          return;
        }
      }
      this.item = null;
    }
  }
});

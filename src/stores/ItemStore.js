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

      console.log('items', this.items);
    },
    async addItem(params) {
      const item = await apiPost('/items', params);
      console.log('item', item);
    },
    async editItem(id, params) {
      const item = await apiPut(`/items/${id}`, params);
      console.log('item', item);
    }
  }
});

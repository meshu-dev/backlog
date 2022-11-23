import { defineStore } from 'pinia';
import { callApi } from '../helpers/store';
import { categoryService } from '../helpers/api';

export const useCategoryStore = defineStore({
  id: 'categories',
  state: () => ({
    categories: [],
    category: null,
    total: 0,
    pageLimit: 10
  }),
  getters: {
    getCategories(state) {
      return state.categories;
    },
    getCategoryNames(state) {
      return state.categories.map(category => category.name);
    },
    getCategory(state) {
      return state.category;
    },
    getCategoryId(state) {
      return state.category && state.category.id ? state.category.id : 0;
    },
    getTotal(state) {
      return state.categories.length;
    },
    getPageLimit(state) {
      return state.pageLimit;
    }
  },
  actions: {
    async fetchCategories() {
      /*
      try {
        const apiCategories = await categoryService.getAll();
        this.categories = apiCategories['data'] ?? [];
      } catch (error) {
        if (error.cause == 401) {

        }

        console.log('ERR', error, error.cause, `C: [[[${error.cause}]]]`);
      } */

      await callApi(async () => {
        const apiCategories = await categoryService.getAll();
        this.categories = apiCategories['data'] ?? [];
      });
    },
    setSelectedCategory(categoryId) {
      for (let category of this.categories) {
        if (category.id == categoryId) {
          this.category = category;
          return;
        }
      }
      this.category = null;
    }
  }
});

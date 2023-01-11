import { defineStore } from 'pinia';
import { callApi } from '../helpers/store';
import { categoryService } from '../helpers/api';

export const useCategoryStore = defineStore({
  id: 'categories',
  state: () => ({
    categories: [],
    category: null,
    pageLimit: 10,
    isFetching: false
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
      if (this.categories.length > 0 || this.isFetching === true) {
        return false;
      }

      this.isFetching = true;

      await callApi(async () => {
        const apiCategories = await categoryService.getAll();
        this.categories = apiCategories['data'] ?? [];
      });

      this.isFetching = false;
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

import { defineStore } from 'pinia';
import { callApi } from '../helpers/store';
import { omdbService } from '../helpers/api';

export const useImageStore = defineStore({
  id: 'image',
  state: () => ({
    isFormVisible: false,
    searchResults: [],
    searchedResults: [],
    entries: []
  }),
  getters: {
    isFormVisible(state) {
      return state.isFormVisible;
    },
    getSearchResults() {
      return state.searchResults;
    },
    getSearchedResults() {
      return (term) => {
        if (state.searchedResults[term]) {
          return state.searchedResults[term];
        }
        return null;
      };
    },
    getEntries() {
      return (id) => {
        if (state.searchResults[id]) {
          return state.searchResults[term];
        }
        return [];
      };
    }
  },
  actions: {
    setFormVisiblity(isVisible) {
      this.isFormVisible = isVisible;
    },
    async search(term) {
      const apiFtn = async () => {
        const result = await omdbService.search(term);
        result = result['data'] ?? [];

        this.searchResults = result;
        this.searchedResults[term] = result;

        console.log('RESULT', result);

        //this.items = result['data'] ?? [];
      };

      const result = await callApi(apiFtn);
      return result;
    },
    async fetchById(id) {
      const apiFtn = async () => {
        const result = await omdbService.getById(id);
        console.log('RESULT', result);

        //this.items = result['data'] ?? [];
      };

      const result = await callApi(apiFtn);
      return result;
    }
  }
});

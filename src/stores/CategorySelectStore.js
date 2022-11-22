import { defineStore } from 'pinia';
import { useCategoryStore } from '@/stores/CategoryStore';

const allOption = { text: 'All', value: 0 };

export const useCategorySelectStore = defineStore({
  id: 'category-select',
  state: () => ({
    allOption: allOption,
    selectedOption: allOption
  }),
  getters: {
    getAllOption(state) {
      return state.allOption;
    },
    getSelectedOption(state) {
      return state.selectedOption;
    },
    getCategoryOptions(state) {
      const categoryStore = useCategoryStore();
      const options = [allOption];
      
      const categoryOptions = categoryStore.getCategories.map((category) => {
        return {
          text: category.name,
          value: category.id
        };
      });

      return options.concat(categoryOptions);
    }
  },
  actions: {
    setSelectedOption(option) {
      this.selectedOption = option;
    }
  }
});

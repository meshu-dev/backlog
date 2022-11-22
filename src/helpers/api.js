import TokenService from '../services/TokenService';
import ApiService from '../services/ApiService';
import ItemService from '../services/ItemService';
import CategoryService from '../services/CategoryService';

const apiService = new ApiService(
  new TokenService(),
  import.meta.env.VITE_API_URL
);

export const itemService = new ItemService(
    apiService,
    'items'
);

export const categoryService = new CategoryService(
  apiService,
  'categories'
);

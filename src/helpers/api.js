import TokenService from '../services/TokenService';
import ApiService from '../services/ApiService';
import AuthService from '../services/AuthService';
import ItemService from '../services/ItemService';
import CategoryService from '../services/CategoryService';

const apiService = new ApiService(
  new TokenService(),
  import.meta.env.VITE_API_URL
);

export const authService = new AuthService(
  apiService,
  'login'
);

export const itemService = new ItemService(
    apiService,
    'items'
);

export const categoryService = new CategoryService(
  apiService,
  'categories'
);

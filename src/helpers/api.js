import TokenService from '../services/TokenService';
import ApiService from '../services/ApiService';
import AuthService from '../services/AuthService';
import ItemService from '../services/ItemService';
import CategoryService from '../services/CategoryService';
import OmdbService from '../services/OmdbService';

const backlogApiService = new ApiService(
  import.meta.env.VITE_BACKLOG_API_URL,
  new TokenService()
);

const omdbApiService = new ApiService(
  import.meta.env.VITE_OMDB_API_URL
);

export const omdbService = new OmdbService(
  omdbApiService
)

export const authService = new AuthService(
  backlogApiService,
  'login'
);

export const itemService = new ItemService(
  backlogApiService,
  'items'
);

export const categoryService = new CategoryService(
  backlogApiService,
  'categories'
);

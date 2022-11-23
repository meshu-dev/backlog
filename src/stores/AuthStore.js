import { defineStore } from 'pinia';
import router from '../router';
import { authService } from '../helpers/api';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isAppLoaded: false,
    loggedIn: false
  }),
  getters: {
    isLoggedIn(state) {
      return state.loggedIn;
    }
  },
  actions: {
    verifyAuth() {
      if (this.isAppLoaded === false) {
        const token = localStorage.getItem('token');

        this.loggedIn = token ? true : false;
        this.isAppLoaded = true;
      }
    },
    async login(username, password) {
      const isLoggedIn = await authService.login(username, password);
      this.loggedIn = isLoggedIn;

      if (isLoggedIn === true) {
        router.push('/');
      }
    },
    logout() {
      authService.logout();
      this.loggedIn = false;

      router.push('/login');
    }
  }
});

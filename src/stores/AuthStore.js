import { defineStore } from 'pinia';
import { authService } from '@/helpers/api';

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
    fetchAuthStatus() {
      if (this.isAppLoaded === false) {
        const isLoggedIn = Boolean(localStorage.getItem('isLoggedIn'));

        this.loggedIn = isLoggedIn === true ? true : false;
        this.isAppLoaded = true;
      }
    },
    async login(username, password) {
      const response = await authService.login(username, password);
      this.loggedIn = response === true ? true : false;

      return response;
    },
    logout() {
      localStorage.removeItem('isLoggedIn');
      this.loggedIn = false;
    }
  }
});

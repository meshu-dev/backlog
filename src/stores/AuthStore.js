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
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        this.loggedIn = isLoggedIn === true ? true : false;
        this.isAppLoaded = true;
      }
    },
    async login(username, password) {
      const isLoggedIn = await authService.login(username, password);
      this.loggedIn = isLoggedIn;

      if (isLoggedIn === true) {
        localStorage.setItem('isLoggedIn', true);
        router.push('/');
      }
    },
    logout() {
      localStorage.removeItem('isLoggedIn');
      this.loggedIn = false;

      router.push('/login');
    }
  }
});

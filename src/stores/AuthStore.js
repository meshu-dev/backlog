import { defineStore } from 'pinia';
import router from '../router';
import { apiLogin } from '../helpers/auth';

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
      const token = await apiLogin(username, password);
      //console.log('token', token);

      this.loggedIn = true;

      router.push('/');
    },
    logout() {
      this.loggedIn = false;
      localStorage.removeItem('token');

      router.push('/login');
    }
  }
});

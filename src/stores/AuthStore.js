import { defineStore } from 'pinia';
import router from '@/router';
import { authService } from '@/helpers/api';
import { useLayoutStore } from '@/stores/LayoutStore';

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

      const layoutStore = useLayoutStore();
      layoutStore.clearStatusMsg();

      if (this.loggedIn === true) {  
        localStorage.setItem('isLoggedIn', true);
        await router.push('/');
      } else if (response['message']) {
        layoutStore.setStatusMsg('error', 'Login details were incorrect. Please try again');
      }
    },
    logout() {
      localStorage.removeItem('isLoggedIn');
      this.loggedIn = false;

      router.push('/login');
    }
  }
});

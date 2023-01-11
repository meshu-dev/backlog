import router from '@/router';
import { useLayoutStore } from '@/stores/LayoutStore';
import { useAuthStore } from '@/stores/AuthStore';

// Redirect to login if token is expired
const authCheck = async (response) => {
  const layoutStore = useLayoutStore();
  const authStore = useAuthStore();

  if (authStore.isLoggedIn === true &&
    response && response['code'] === 401
  ) {
    authStore.logout();
    await router.push('/login');

    layoutStore.setStatusMsg(
      'info',
      'Your login has expired. Please login again'
    );
  }
}

export const callApi = async (ftn) => {
  const layoutStore = useLayoutStore();
  let result = null;
  
  try {
    result = await ftn();
  } catch (error) {
    layoutStore.setStatusMsg(
      'error',
      error.message
    );
  }

  await authCheck(result);

  return result;
}

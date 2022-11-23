import router from '@/router';
import { useLayoutStore } from '@/stores/LayoutStore';

export const callApi = async (ftn) => {
  const layoutStore = useLayoutStore();
  let result = null;
  
  try {
    result = await ftn();
  } catch (error) {
    if (error.cause == 401) {
      router.push(`/login`);
    }

    // throw error;

    layoutStore.setStatusMsg({
      type: 'error',
      text: error.message
    });

    console.log('callApi - ERR', error);
  }
  console.log('callApi - RES', result);

  return result;
}

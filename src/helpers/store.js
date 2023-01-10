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
    layoutStore.setStatusMsg('error', error.message);
  }
  return result;
}

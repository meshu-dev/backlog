import router from '@/router';

export const callApi = async (ftn) => {
  let result = null;
  
  try {
    result = await ftn();
  } catch (error) {
    if (error.cause == 401) {
      router.push(`/login`);
    }
    console.log('ERR', error, error.cause, `C: [[[${error.cause}]]]`);
  }
  return result;
}

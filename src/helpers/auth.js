//import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { apiPost } from './api-call.js';

const setTokenCookie = (token) => {
  /*
  setCookie(
    null,
    'authToken',
    token,
    {
      maxAge: 600, // 10 minutes
      path: '/'
    }
  ); */
}

export const apiLogin = async (username, password) => {
  const response = await apiPost(
    'login',
    { username, password }
  );

  if (response['token']) {
    //setTokenCookie(response['token']);
    localStorage.setItem('token', response['token']);
    return true;
  }
  return false;
}

export const authToken = () => {
  let cookies = null; //parseCookies();

  if (cookies.authToken) {
    return cookies.authToken;
  }
  return null;
}

export const isLoggedIn = () => {
  return authToken() !== null ? true : false;
}
  
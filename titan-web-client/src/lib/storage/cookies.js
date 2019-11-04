import Cookies from 'universal-cookie';

const instance = new Cookies();

export function getCookieManager () {
  return instance;
}

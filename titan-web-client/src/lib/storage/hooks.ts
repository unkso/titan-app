import { getCookieManager } from '@titan/lib/storage/cookies';
import { useEffect, useState } from 'react';

const cookieManager = getCookieManager();

/** Returns the value of a single cookie. */
export function useCookie (cookie, options = {}) {
  const [value, setValue] = useState();
  useEffect(() => {
    setValue(cookieManager.get(cookie, options));
  }, [cookie, options]);

  return value;
}

/** Returns a instance of {@link UniversalCookie}. */
export function useCookies () {
  return cookieManager;
}

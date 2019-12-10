const hasLocalStorage = typeof Storage;

export const setCookie = (name, value) => {
  hasLocalStorage
    ? window.localStorage.setItem(name, JSON.stringify(value))
    : (documents.cookie = `${name}=${JSON.stringify(value)}; path=/`);
};

const cookieGetter = name => {
  name = `${name}=`;
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};

export const getCookie = name => {
  return hasLocalStorage
    ? JSON.parse(window.localStorage.getItem(name))
    : cookieGetter(name);
};

export const removeItem = name => {
  window.localStorage.removeItem(name);
};

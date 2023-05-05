export function setLocalStorage(k, v) {
  window.localStorage.setItem(k, JSON.stringify(v));
}

export function getLocalStorage(k) {
  let v = window.localStorage.getItem(k);
  return JSON.parse(v);
}

export function rmLocalStorage(k) {
  window.localStorage.removeItem(k);
}

export function clearLocalStorage() {
  window.localStorage.clear();
}

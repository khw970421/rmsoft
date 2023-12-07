const setItem = (key: string, value: string) =>
  localStorage.setItem(key, JSON.stringify(value));

const getItem = (key: string) => JSON.parse(localStorage.getItem(key) || '');

export { setItem, getItem };
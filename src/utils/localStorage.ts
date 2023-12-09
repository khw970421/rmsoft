const setItem = <T>(key: string, value: T) =>
  localStorage.setItem(key, JSON.stringify(value));

const getItem = (key: string) => JSON.parse(localStorage.getItem(key) || 'null')

export { setItem, getItem };
const setItem = <T>(key: string, value: T) =>
  localStorage.setItem(key, JSON.stringify(value));

const getItem = (key: string) => {
  let localItem = null
  try {
    localItem = JSON.parse(localStorage.getItem(key) || 'null')
    return localItem
  }
  catch (e) {
    console.error('Something localStorage is wrong. remove item')
    localStorage.removeItem(key)
    return localItem
  }
}

export { setItem, getItem };
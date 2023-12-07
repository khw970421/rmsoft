const debounce = (func: () => void, timer: number = 500) => {
  let timerId: number

  return () => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      func()
    }, timer)
  }
}

export default debounce

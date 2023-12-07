const getTime = (date: Date): string => {
  return `${date.getHours()}:${date.getMinutes()}`
}
export default getTime
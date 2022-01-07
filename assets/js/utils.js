export const toUpperFirst = (string) => {
  if (!string) { return '' }
  return string.charAt(0).toUpperCase() + string.slice(1)
}
export const setPrice = (number) => {
  return new Intl.NumberFormat('en-US').format(number)
}

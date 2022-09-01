export const generateRandomColor = (opacity: boolean = true) =>
  '#' +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')
    .toUpperCase()

export const generateColorOutOfString = (
  str: string,
  opacity: boolean = true,
) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += ('00' + value.toString(16)).substr(-2)
  }
  if (opacity) {
    return color + 'bf'
  }

  return color
}

export const getAlphabetChar = (index: number) =>
  'abcdefghijklmnopqrstuvwxyz'[index]

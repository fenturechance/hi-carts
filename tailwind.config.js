module.exports = {
  mode: 'jit',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: ({ colors }) => ({
      ...colors,
      gray: {
        50: '#f0f0f0',
        100: '#fafafa',
        200: '#f3f3f3',
        300: '#d9d9d9',
        400: '#bfbfbf',
        450: '#8c8c8c',
        500: '#595959'
      },
      cyan: {
        50: '#eef4f5',
        500: '#1ca6c8',
        600: '#1790ad'
      },
      red: {
        50: '#ffe6e7',
        500: '#e25353'
      },
      stone: {
        800: '#434343',
        900: '#454545'
      },
      yellow: {
        200: '#ffc645',
        300: '#ffa81e'
      }
    }),
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}

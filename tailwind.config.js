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
        100: '#fafafa',
        300: '#d9d9d9',
        400: '#bfbfbf',
        450: '#8c8c8c',
        500: '#595959'
      },
      cyan: {
        600: '#1790ad'
      }
    }),
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}

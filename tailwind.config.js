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

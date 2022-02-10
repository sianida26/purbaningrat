module.exports = {
  content: [
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
  prefix: 'tw-'
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html"],
  theme: {
    extend: {
      colors: {
        'bg': "var(--bg)",
        'darkBg': "var(--dark-bg)",
        'text': "var(--text)",
        'darkText': "var(--dark-text)",
        'inputColor': "var(--input-color)",
        'elem': "var(--elem)",
        'darkElem': "var(--dark-elem)",
      },
    },
    plugins: [],
  },
}
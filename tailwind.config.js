/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html"],
  theme: {
    extend: {
      colors: {
        'bg': "var(--bg)",
        'text': "var(--text)",
        'inputColor': "var(--input-color)",
        'elem': "var(--elem)",
        'hover': "var(--hover)",
      },
    },
    plugins: [],
  },
}
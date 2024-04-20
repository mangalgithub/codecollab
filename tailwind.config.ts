module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        'editor': '280px 1fr',
      },
      colors: {
        "primary" : "#4aee88",
        "bgdark" : "#800080",
        "bgpink" : "#3A0D56",
        "textpink": "#ED61E6",
        "textblue": "#419AE5"

      }
    },
  },
  plugins: [],
}

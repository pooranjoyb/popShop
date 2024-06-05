/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts, jsx}"],
  plugins: [
    require("daisyui"),
    // require('@tailwindcss/aspect-ratio'),
  ],
  daisyui: {
    themes: ["light"],
  },
  theme: {
    colors: {
      "mygreen": "#06D6A0",
      "myred": "#EF476F",
      "myyellow": "#FFD166",
      "myblue": "#118AB2",
      "mynavy": "#073B4C",
      "mywhite": "#FFFFFF"
    },
  },
}
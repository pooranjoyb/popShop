/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,tsx,ts, jsx}"],
    plugins: [require("daisyui")],
    daisyui: {
      themes: ["light"],
    },
  }
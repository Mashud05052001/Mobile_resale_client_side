/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mobileventtheme: {
          primary: '#dfdede',
          secondary: '#c6bcb6',
          accent: "#96897f",
          neutral: "#625750",
          success: "#119613",
          warning: "#ffcc00",
          error: "#e71414",
          "base-100": "#FFFFFF",
        }
      }
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
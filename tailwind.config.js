/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3D8361",
        "primary-shade": "#377657",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

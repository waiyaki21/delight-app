/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    // extend: {},
    screens: {
      'xs': '475px',
      "xs-max": { max: "475px" },
      sm: "576px",
      "sm-max": { max: "576px" },
      md: "768px",
      "md-max": { max: "768px" },
      lg: "1024px",
      "lg-max": { max: "1024px" },
      xl: "1280px",
      "xl-max": { max: "1280px" },
      "2xl": "1536px",
      "2xl-max": { max: "1536px" },
    },
  },
  plugins: [
      require('flowbite/plugin')
  ],
}

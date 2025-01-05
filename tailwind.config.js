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
    // fontSize: {
    //   '2xs' : '10px',
    //   xs    : '0.75rem',
    //   sm    : '0.8rem',
    //   base  : '1rem',
    //   md    : '1.1rem',
    //   lg    : '1.2rem',
    //   xl    : '1.4rem',
    //   '2xl' : '1.6rem',
    //   '3xl' : '2.0rem',
    //   '4xl' : '2.4rem',
    //   '5xl' : '3.0rem',
    // },
    // borderWidth: {
    //   DEFAULT: '1px',
    //   base: '2.2px',
    //   '0': '0',
    //   '2': '2px',
    //   '3': '3px',
    //   '4': '4px',
    //   '6': '6px',
    //   '8': '8px',
    // },
  },
  plugins: [
      require('flowbite/plugin')
  ],
}

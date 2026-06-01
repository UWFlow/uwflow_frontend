/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  // The app ships its own CSS reset in public/index.css
  // (`* { box-sizing: border-box; margin: 0; padding: 0 }`, button/anchor
  // resets, etc.), so Tailwind's preflight is disabled to avoid double-
  // resetting and altering the existing styled-components UI.
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      // Mirrors src/constants/GlobalTheme.tsx so styled-components and Tailwind
      // share a single palette. Keep these two files in sync.
      colors: {
        primary: '#0052cc',
        primaryDark: '#0747a6',
        primaryExtraDark: '#042049',
        courses: '#ff8b00',
        professors: '#36b37e',
        accent: '#ffc400',
        accentDark: '#e8b300',

        dark1: '#172b4d',
        dark2: '#505f79',
        dark3: '#97a0af',

        light1: '#f4f5f7',
        light2: '#ebecf0',
        light3: '#dfe1e5',
        light4: '#c6c9c9',

        lecture: '#b3d4ff',
        lab: '#b3f3ff',
        tutorial: '#c0b6f2',

        white: '#ffffff',
        red: '#ff5630',
        darkRed: '#de350b',

        google: '#4285f4',
        facebook: '#3c5a99',

        transparent: 'rgba(0, 0, 0, 0)',
      },
      // Mirrors GlobalTheme.breakpoints (min-width). `zero` (0) is the base, so
      // it is intentionally omitted as a Tailwind screen.
      screens: {
        mobileLarge: '600px',
        tablet: '800px',
        desktop: '1200px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

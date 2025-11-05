// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 1. เพิ่ม keyframes สำหรับการลอย
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        'float-river': {
          '0%': { transform: 'translateX(0) translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateX(-20px) translateY(-10px) rotate(-3deg)' },
          '50%': { transform: 'translateX(15px) translateY(-20px) rotate(3deg)' },
          '75%': { transform: 'translateX(-10px) translateY(-5px) rotate(-1deg)' },
          '100%': { transform: 'translateX(0) translateY(0) rotate(0deg)' },
        },
        'gentle-bob': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-6px) scale(1.02)' },
        },
        'drift-slow': {
          '0%': { transform: 'translateX(-100vw)' },
          '100%': { transform: 'translateX(100vw)' },
        },
      },
      // 2. เพิ่ม animation utility
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-river': 'float-river 4s ease-in-out infinite',
        'gentle-bob': 'gentle-bob 4s ease-in-out infinite',
        'drift-slow': 'drift-slow 30s linear infinite',
      },
    },
    // 3. Override default font families to use Prompt everywhere
    fontFamily: {
      sans: ['var(--font-prompt)', 'sans-serif'],
      prompt: ['var(--font-prompt)', 'sans-serif'],
    },
  },
  plugins: [],
};
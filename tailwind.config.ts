import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'green': '#99f6e4',
      'dark': '#042f2e'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
        "primary": "#ef9995",
        "secondary": "#a4cbb4",
        "accent": "#dc8850",
        "neutral": "#2e282a",
        "base-100": "#e4d8b4",
        "info": "#2463eb",
        "success": "#16a249",
        "warning": "#db7706",
        "error": "#dc2828",
        },
      },
    ],
  }, 
  plugins: [require("daisyui")],
}
export default config

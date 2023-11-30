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
        "primary": "#78CAD2",
        "secondary": "#1C110A",
        "accent": "#dc8850",
        "pumpkin": "#FE7F2D",
        "neutral": "#FFEAEE",
        "base-100": "#62A8AC",
        "info": "#2463eb",
        "success": "#16a249",
        "warning": "#db7706",
        "error": "#dc2828",
        },
      },
    ],
  }, 
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
export default config

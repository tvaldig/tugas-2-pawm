import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "biru-tua": "#4E75FF",
        "kuning-muda": "#FFF09B",
        "kuning-tua" : "#D5CC01",
      },
      fontFamily:{
        spbutchlite: ["SpButchLite", "sans-serif"],
        superfunky: ["SuperFunky", "sans-serif"]
      },
      animation: {
        "text-reveal": "text-reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s",
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        "text-reveal": {
          "0%": {
            transform: "translate(0, 70%)",
          },
          "100%": {
            transform: "translate(0, 0)",
          },
          
        },
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      },
      backgroundImage: {
        'bg-1': "url('/bg-1.png')",
        'bg-2': "url('/bg-2.png')",
      }
    },
  },
  plugins: [],
};
export default config;

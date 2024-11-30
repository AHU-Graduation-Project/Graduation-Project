/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        fill: "hsl(var(--fill))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      backgroundImage: {
        'theme': 'var(--theme-gradient)',
        'icon': 'var(--theme-gradient)',
      },
      textColor: {
        'theme': 'transparent',
        'icon': 'transparent',
      },
      backgroundClip: {
        'text': 'text',
      },
    },
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("tailwindcss-animate"),
    function({ addBase, addUtilities }) {
      addBase({
        ':root': {
          '--theme-gradient': 'linear-gradient(to right, var(--theme-from), var(--theme-to))',
          '--theme-from': '#3B82F6',
          '--theme-to': '#8B5CF6',
        },
      });
      
      addUtilities({
        '.text-theme': {
          'background': 'var(--theme-gradient)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
          'color': 'transparent',
        },
        '.bg-theme': {
          'background': 'var(--theme-gradient)',
        },
        '.bg-icon': {
          'background': 'var(--theme-gradient)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
          'color': 'transparent',
        },
      });
    },
  ],
};
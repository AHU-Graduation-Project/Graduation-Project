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
        theme: "var(--theme-gradient)",
        icon: "var(--theme-gradient)",
      },
      textColor: {
        theme: "transparent",
        icon: "transparent",
      },
      backgroundClip: {
        text: "text",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "inherit",
            a: {
              color: "inherit",
              textDecoration: "underline",
              fontWeight: "500",
            },
            code: {
              color: "inherit",
              background: "hsl(var(--muted))",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    function ({ addBase, addUtilities }) {
      addBase({
        ":root": {
          "--theme-gradient":
            "linear-gradient(to right, var(--theme-from), var(--theme-to))",
          "--theme-from": "#3B82F6",
          "--theme-to": "#8B5CF6",
        },
      });

      addUtilities({
        ".text-theme": {
          background: "var(--theme-gradient)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
          color: "transparent",
        },
        ".bg-theme": {
          background: "var(--theme-gradient)",
        },
        ".bg-icon": {
          background: "var(--theme-gradient)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
          color: "transparent",
        },
        ".bg-theme-shadow": {
          boxShadow: `0 4px 15px var(--theme-from), 0 8px 30px var(--theme-to)`,
        },
        ".bg-theme-blur": {
          position: "relative", // Make sure the element has a position for the pseudo-element
        },
        ".bg-theme-blur::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "var(--theme-gradient)",
          filter: "blur(3px)", // Apply the background blur
          zIndex: -1, // Ensure it stays behind the content
        },
        ".border-theme": {
          borderImage:
            "linear-gradient(to right, var(--theme-from) 0%, var(--theme-to) 100%) 1",
        },
      
      });
    },
  ],
};

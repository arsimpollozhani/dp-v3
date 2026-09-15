/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#141010",
        coal: "#1e1611",
        ember: "#c2410c",
        cream: "#faf6ee",
        sand: "#f1e8d7",
        gold: {
          DEFAULT: "#d4a437",
          soft: "#f3e3b3",
          deep: "#9a7418",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", '"Times New Roman"', "serif"],
        sans: ["Inter", "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(212, 164, 55, 0.55)",
        card: "0 20px 50px -20px rgba(20, 16, 16, 0.35)",
        lift: "0 30px 70px -25px rgba(20, 16, 16, 0.5)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1.12)" },
          "100%": { transform: "scale(1)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.15)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        "ken-burns": "ken-burns 8s cubic-bezier(0.22, 1, 0.36, 1) both",
        glow: "glow 6s ease-in-out infinite",
        shimmer: "shimmer 3.5s linear infinite",
      },
    },
  },
  plugins: [],
};

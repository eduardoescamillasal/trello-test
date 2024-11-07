/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kb_bg: {
          DEFAULT: "#F3F4F6",
          plan: "#2B2B3F",
          card: "#FFFFFF",
          add_plan: "#6366F1",
          add_plan_hover: "#4F46E5",
        },
        kb_txt: {
          DEFAULT: "#1F2937",
        },
        indigo: {
          200: "#A5B4FC",
          600: "#4F46E5",
          700: "#4338CA",
        },
        pastel: {
          blue: "#A5D8FF",
          purple: "#D4A5FF",
          pink: "#FFAFCC",
          green: "#C4F1BE",
        },
      },
      backgroundImage: {
        "grainy-gradient": "linear-gradient(to right, #6366F1, #E879F9)",
        "pastel-gradient": "linear-gradient(to bottom right, #A5D8FF, #FFAFCC, #C4F1BE, #D4A5FF)",
      },
      backgroundBlendMode: {
        overlay: "overlay",
      },
      fontSize: {
        "custom-size": "2.5rem",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
      },
      transitionDuration: {
        200: "200ms",
        300: "300ms",
      },
      boxShadow: {
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      spacing: {
        272: "272px",
      },
    },
  },
  plugins: [],
};
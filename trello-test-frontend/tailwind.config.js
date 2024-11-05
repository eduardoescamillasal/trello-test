/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kb_bg: {
          DEFAULT: "#1E1E2F",
          plan: "#2B2B3F",
          card: "#3C3C51",
          add_plan: "#6366F1",
          add_plan_hover: "#4F46E5",
          scroll: "#A1A1AA",
          tooltip: "#F3F4F6",
          edit: "#27293D",
        },
        kb_txt: {
          DEFAULT: "#E5E7EB",
        },
      },
      backgroundImage: {
        "grainy-gradient": "linear-gradient(to right, #6366F1, #E879F9)",
      },
      backgroundBlendMode: {
        overlay: "overlay",
      },
      fontSize: {
        xs: ".75rem",
        sm: ".875rem",
        base: "1rem",
        md: "1.125rem",
        lg: "1.25rem",
        xl: "1.5rem",
        "2xl": "1.75rem",
        "3xl": "2rem",
        "custom-size": "2.5rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
        heading: ["Poppins", "sans-serif"],
        body: ["Roboto", "sans-serif"],
        "custom-font": ['"Your Custom Font"', "sans-serif"],
      },
      fontWeight: {
        hairline: "100",
        thin: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
        "extra-black": "950",
      },
      lineHeight: {
        "extra-tight": "1",
        tight: "1.25",
        normal: "1.5",
        loose: "1.75",
        "extra-loose": "2",
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
        "extra-wide": "0.15em",
      },
      textShadow: {
        default: "0 2px 4px rgba(0, 0, 0, 0.10)",
        md: "0 4px 6px rgba(0, 0, 0, 0.10)",
        custom: "2px 2px 5px rgba(99, 102, 241, 0.5)",
      },
      clipPath: {
        "my-shape": "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow"), require("tailwind-clip-path")],
};

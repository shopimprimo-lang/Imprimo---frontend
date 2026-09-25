import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Reference typography (imprimotrading.com): Playfair Display + Poppins
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        integralCF: ["var(--font-heading)", "serif"],
        satoshi: ["var(--font-body)", "sans-serif"],
        playfair: ["var(--font-heading)", "serif"],
        inter: ["var(--font-body)", "sans-serif"],
        syne: ["var(--font-heading)", "serif"],
      },
      screens: {
        xs: "375px",
      },
      width: {
        frame: "77.5rem",
      },
      maxWidth: {
        frame: "77.5rem",
      },
      colors: {
        // Reference palette (imprimotrading.com :root)
        im: {
          black: "#0B0B0B",   // --deep-black: page background
          velvet: "#080808",  // --velvet-black: footer / deepest sections
          card: "#111111",    // --card-bg
          gold: "#D4AF37",    // --metallic-gold: headings, links, accents
          accent: "#D3A745",  // nav links + filled buttons (rgb 211,167,69)
          rich: "#C9A646",    // --rich-gold: borders, hover
          deep: "#B68E2F",    // gradient end
          text: "#E5E5E5",    // --light-gray: body text
          muted: "#A8A8A8",   // secondary text
        },
        imprimo: {
          red: "#D63440",
          accent: "#EE444C",
          gold: "#D9A300",
          charcoal: "#2B2B2B",
          black: "#111111",
          white: "#FFFBF5",
          lightGray: "#F5F4F2",
          text: "#1A1A1A",
          border: "#EFEFEF",
        },
        luxury: {
          gold: "#D9A300",
          dark: "#0F0F0F",
          cream: "#FAF9F8",
          slate: "#2F2F2F",
          "light-gray": "#F5F3F0",
          "accent-gold": "#E0A800",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#D4AF37",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#C9A646",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      boxShadow: {
        'soft': '0 4px 24px -2px rgba(0, 0, 0, 0.04), 0 2px 8px -2px rgba(0, 0, 0, 0.02)',
        'soft-hover': '0 12px 36px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(30px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-left": {
          from: { transform: "translateX(-50px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "parallax": {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-50px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.7s ease-out",
        "slide-in-left": "slide-in-left 0.7s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  safelist: ["backdrop-blur-[2px]"],
};
export default config;


import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        neutral: {
          DEFAULT: "hsl(var(--neutral))",
          light: "#F8FAFC",
          dark: "#0F172A",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#F0F4FF",
          100: "#E6F0FF",
          200: "#CCE0FF",
          300: "#99C1FF",
          400: "#66A3FF",
          500: "#3385FF",
          600: "#0066FF",
          700: "#0052CC",
          800: "#003D99",
          900: "#002966",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        glass: {
          DEFAULT: "var(--glass-bg)",
          border: "var(--glass-border)",
        },
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-secondary": "var(--gradient-secondary)",
        "gradient-accent": "var(--gradient-accent)",
        "gradient-mesh": "var(--gradient-mesh)",
        "shimmer": "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "system-ui", "sans-serif"],
        display: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "system-ui", "sans-serif"],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '-0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '-0.01em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '-0.01em' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.02em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotateZ(0deg)" },
          "33%": { transform: "translateY(-10px) rotateZ(1deg)" },
          "66%": { transform: "translateY(-5px) rotateZ(-1deg)" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translateY(0) rotateZ(0deg)" },
          "33%": { transform: "translateY(-15px) rotateZ(-1deg)" },
          "66%": { transform: "translateY(-8px) rotateZ(1deg)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-slide-in": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(102, 126, 234, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(102, 126, 234, 0.6)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "magnetic-pulse": {
          "0%, 100%": { 
            transform: "scale(1)",
            boxShadow: "0 0 0 0 rgba(102, 126, 234, 0.4)"
          },
          "50%": { 
            transform: "scale(1.02)",
            boxShadow: "0 0 0 20px rgba(102, 126, 234, 0)"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 8s ease-in-out infinite",
        "float-delayed": "float-delayed 8s ease-in-out infinite",
        fadeIn: "fadeIn 0.6s ease-out",
        "fade-slide-in": "fade-slide-in 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
        slideIn: "slideIn 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
        "slide-up": "slide-up 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
        pulse: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
        "scale-in": "scale-in 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "magnetic-pulse": "magnetic-pulse 2s ease-in-out infinite",
      },
      boxShadow: {
        'input': '0 1px 3px rgba(0,0,0,0.1)',
        'card': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        'card-hover': '0 32px 64px rgba(0,0,0,0.15)',
        'button': '0 2px 4px rgba(0,0,0,0.05)',
        'hover': '0 16px 32px rgba(0,0,0,0.15)',
        'glass': 'var(--glass-shadow)',
        'glow': '0 0 40px rgba(102, 126, 234, 0.3)',
        'glow-lg': '0 0 60px rgba(102, 126, 234, 0.4)',
        'premium': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'premium-lg': '0 16px 48px rgba(0, 0, 0, 0.15)',
      },
      backdropFilter: {
        'glass': 'blur(24px) saturate(200%)',
        'nav': 'blur(32px) saturate(180%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

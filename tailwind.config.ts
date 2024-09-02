import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

const config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.tsx",
    "./src/app/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./src/components/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./src/pages/**/*.{js,jsx,ts,tsx,md,mdx}",
  ],
  theme: {
    boxShadow: {
      // x y blur spread color
      focus: "0 0 1rem .1rem rgb(var(--accent)/.08);",
      menu: "0 0 5rem 5rem rgb(var(--dark)/.08);",
      elevate:
        "0 .5rem 5rem -1rem rgb(var(--dark)/.08), 0 .25rem 1.5rem -1rem rgb(var(--dark)/.2);",
      bgBlend: "inset 0 0 4rem 2rem rgb(var(--background));",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        neutral: {
          "50": "#f7f6f5",
          "100": "#edebe7",
          "200": "#d9d6cf",
          "300": "#c1bcb0",
          "400": "#a79e90",
          "500": "#95897a",
          "600": "#887b6e",
          "700": "#72655c",
          "800": "#5e554e",
          "900": "#4d4641",
          "950": "#292421",
        },
        merino: {
          "50": "#f9f7f3",
          "100": "#f3f0e8",
          "200": "#e1d9c7",
          "300": "#cec0a3",
          "400": "#baa37d",
          "500": "#ab8c64",
          "600": "#9e7b58",
          "700": "#84644a",
          "800": "#6b5241",
          "900": "#584436",
          "950": "#2e231c",
        },
        blue: {
          "50": "#ebfaff",
          "100": "#d2f2ff",
          "200": "#b0e8ff",
          "300": "#79ddff",
          "400": "#3ac6ff",
          "500": "#0da5ff",
          "600": "#0081ff",
          "700": "#0068ff",
          "800": "#0055d2",
          "900": "#0454b6",
          "950": "#082e63",
        },
        sky: {
          "50": "#edf7ff",
          "100": "#d7ebff",
          "200": "#b9deff",
          "300": "#88cbff",
          "400": "#50aeff",
          "500": "#288aff",
          "600": "#0764ff",
          "700": "#0a53eb",
          "800": "#0f43be",
          "900": "#133d95",
          "950": "#11275a",
        },
        rose: {
          "50": "#fff0f1",
          "100": "#ffdde0",
          "200": "#ffc1c7",
          "300": "#ff959f",
          "400": "#ff5969",
          "500": "#ff263a",
          "600": "#fc061d",
          "700": "#df0015",
          "800": "#af0515",
          "900": "#900c18",
          "950": "#500008",
        },
        red: {
          "50": "#fff0f0",
          "100": "#ffdfde",
          "200": "#ffc4c2",
          "300": "#ff9b98",
          "400": "#ff615d",
          "500": "#ff302a",
          "600": "#f7110b",
          "700": "#e60b05",
          "800": "#ac0c08",
          "900": "#8e110e",
          "950": "#4e0301",
        },
      },
      borderRadius: {
        xl: "1rem",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
        outline:
          "0 0px 16px var(--tw-shadow-color), 0 0px 16px var(--tw-shadow-color), 0 0px 32px var(--tw-shadow-color), 0 0px 8px var(--tw-shadow-color),0 0px 4px var(--tw-shadow-color)",
      },
      backgroundImage: {
        "transparent-window":
          "linear-gradient(to right, rgb(var(--background)) 0%, rgb(var(--background)) 3%, transparent 15%, transparent 85%, rgb(var(--background)) 97%, rgb(var(--background)) 100%)",
      },
      fontFamily: {
        sans: [
          "var(--font-fira-sans)",
          "Fira Sans",
          ...defaultTheme.fontFamily.sans,
        ],
        mono: [
          "var(--font-fira-code)",
          "Fira Code",
          ...defaultTheme.fontFamily.mono,
        ],
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
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },

        typewriter: {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        typewriter: "typewriter 0.5s ease-out forwards",
      },
      screens: {
        md: "1000px",
        lg: "1400px",
        xl: "1700px",
        "2xl": "2400px",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }: PluginAPI) {
      matchUtilities(
        {
          "text-shadow": (value: string) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
} satisfies Config;

export default config;

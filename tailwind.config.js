const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

// const durations = {
//   200: '200ms',
//   300: '300ms',
//   500: '500ms',
//   1500: '1500ms',
//   2000: '2000ms',
//   2500: '2500ms',
//   3000: '3000ms',
//   3500: '3500ms',
//   4000: '4000ms',
//   4500: '4500ms',
//   5000: '5000ms',
//   5500: '5500ms',
//   6000: '6000ms',
//   6500: '6500ms',
//   '10k': '10000ms',
//   '20k': '20000ms',
//   '30k': '30000ms',
//   '40k': '40000ms',
//   '50k': '50000ms',
//   '60k': '60000ms',
//   '70k': '70000ms',
//   '80k': '80000ms',
//   '90k': '90000ms',
//   '100k': '100000ms',
//   '160k': '160000ms'
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", "class"],
  theme: {
  	extend: {
  		fontFamily: {
  			orbitron: [
  				'Orbitron',
  				'sans-serif'
  			],
  			poppins: [
  				'Poppins',
  				'sans-serif'
  			]
  		},
  		screens: {
  			l1: '1080px',
  			l2: '1000px',
  			l3: '750px',
			xl1: '1300px',
  			m1: '600px',
  			m2: '560px',
  			m3: '450px',
  			m4: '375px'
  		},
  		boxShadow: {
  			input: '`0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`'
  		},
  		animation: {
  			gradient: 'gradient 8s linear infinite',
  			wave1: 'wave 13s linear infinite',
  			wave2: 'wave 10s linear infinite',
  			wave3: 'wave 7s linear infinite',
  			submarine: 'submarine 4s ease-in-out infinite',
  			float: 'float 4s ease-in-out infinite'
  		},
  		keyframes: {
  			gradient: {
  				to: {
  					backgroundPosition: 'var(--bg-size) 0'
  				}
  			},
  			wave: {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			},
  			submarine: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			float: {
  				'0%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-14px)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			}
  		}
  	}
  },
  plugins: [addVariablesForColors, require("tailwindcss-animate")],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

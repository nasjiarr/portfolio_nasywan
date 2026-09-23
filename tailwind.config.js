/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				paper: '#FAFAF7', // Warm off-white
				ink: '#0D0D0D', // Near-black text
				dark: {
					bg: '#0A0A0A', // Near-black dark background
					surface: '#141414',
					border: '#242424',
					text: '#F5F5F0', // Off-white dark text
					muted: '#94948C'
				},
				light: {
					bg: '#FAFAF7',
					surface: '#FFFFFF',
					border: '#E7E7E0',
					text: '#0D0D0D',
					muted: '#6E6E66'
				},
				accent: {
					DEFAULT: '#1B4D3E', // Deep Emerald understated accent
					hover: '#143B30',
					light: '#E7F2EE',
					dark: '#34D399',
					muted: '#2A6653'
				},
				gold: {
					DEFAULT: '#B48C36', // Muted Gold accent option
					hover: '#96742A',
					light: '#F8F4EA',
					dark: '#D4AA50'
				}
			},
			fontFamily: {
				serif: ['"Instrument Serif"', 'Fraunces', 'Georgia', 'serif'],
				sans: ['"Geist"', 'Inter', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: []
};

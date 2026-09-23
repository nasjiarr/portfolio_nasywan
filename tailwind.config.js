/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				paper: '#F4F6F8', // Cold Nordic Frost White
				ink: '#090C10', // Cold Carbon Obsidian
				dark: {
					bg: '#07090D', // Glacial Void / Deep Obsidian
					surface: '#0E1117', // Cold Slate Surface
					border: '#1A202C', // Hairline Frosted Steel Border
					text: '#F0F3F8', // Frosted Platinum
					muted: '#8C96A8' // Cold Mist Slate
				},
				light: {
					bg: '#F4F6F8',
					surface: '#FFFFFF',
					border: '#E2E5EB', // Hairline Cool Platinum Border
					text: '#090C10',
					muted: '#5B6371' // Cold Steel Grey
				},
				accent: {
					DEFAULT: '#1248A6', // Architectural Cold Azure / Cobalt
					hover: '#0C3782', // Deep Arctic Cobalt
					light: '#E8EEFA', // Icy Azure Tint
					dark: '#38BDF8', // Luminous Glacial Cyan
					muted: '#1E3A8A'
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

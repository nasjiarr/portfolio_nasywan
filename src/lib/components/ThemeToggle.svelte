<script>
	import { onMount } from 'svelte';

	let isDark = $state(false);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
		isDark = document.documentElement.classList.contains('dark');

		// Watch system preference changes if user hasn't explicitly set localStorage
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		/** @param {MediaQueryListEvent} e */
		const handleChange = (e) => {
			if (!localStorage.getItem('theme')) {
				applyTheme(e.matches);
			}
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	});

	/** @param {boolean} dark */
	function applyTheme(dark) {
		isDark = dark;
		if (dark) {
			document.documentElement.classList.add('dark');
			document.documentElement.style.colorScheme = 'dark';
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			document.documentElement.style.colorScheme = 'light';
			localStorage.setItem('theme', 'light');
		}
	}

	function toggleTheme() {
		applyTheme(!isDark);
	}
</script>

<button
	type="button"
	onclick={toggleTheme}
	class="relative inline-flex items-center justify-center w-9 h-9 rounded-full border border-light-border dark:border-dark-border bg-light-surface/80 dark:bg-dark-surface/80 text-light-text dark:text-dark-text hover:border-accent dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-dark transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
	aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
	title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
>
	<!-- Sun Icon (shown when dark mode is active to switch to light) -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="w-4 h-4 transition-transform duration-200 {isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0 absolute'}"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="1.75"
	>
		<circle cx="12" cy="12" r="4" />
		<path d="M12 2v2" />
		<path d="M12 20v2" />
		<path d="m4.93 4.93 1.41 1.41" />
		<path d="m17.66 17.66 1.41 1.41" />
		<path d="M2 12h2" />
		<path d="M20 12h2" />
		<path d="m6.34 17.66-1.41 1.41" />
		<path d="m19.07 4.93-1.41 1.41" />
	</svg>

	<!-- Moon Icon (shown when light mode is active to switch to dark) -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="w-4 h-4 transition-transform duration-200 {!isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0 absolute'}"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="1.75"
	>
		<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
	</svg>
</button>

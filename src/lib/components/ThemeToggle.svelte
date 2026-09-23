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

	/**
	 * Toggle theme with circular radial reveal starting from button coordinates
	 * @param {MouseEvent} event
	 */
	function toggleTheme(event) {
		const nextDark = !isDark;

		if (typeof window === 'undefined') {
			applyTheme(nextDark);
			return;
		}

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Fallback for browsers without View Transitions or when reduced motion is preferred
		// @ts-ignore
		if (!document.startViewTransition || prefersReducedMotion) {
			applyTheme(nextDark);
			return;
		}

		// Calculate exact origin coordinates of the toggle button
		const button = /** @type {HTMLElement} */ (event.currentTarget);
		const rect = button.getBoundingClientRect();
		const x = rect.left + rect.width / 2;
		const y = rect.top + rect.height / 2;

		// Calculate maximum radius to the furthest corner of viewport
		const endRadius = Math.hypot(
			Math.max(x, window.innerWidth - x),
			Math.max(y, window.innerHeight - y)
		);

		// Scoped class on documentElement for theme transition
		document.documentElement.classList.add('theme-transition');

		// @ts-ignore
		const transition = document.startViewTransition(() => {
			applyTheme(nextDark);
		});

		transition.ready.then(() => {
			const clipPath = [
				`circle(0px at ${x}px ${y}px)`,
				`circle(${endRadius}px at ${x}px ${y}px)`
			];

			document.documentElement.animate(
				{
					clipPath
				},
				{
					duration: 520,
					easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
					pseudoElement: '::view-transition-new(root)'
				}
			);
		});

		transition.finished.finally(() => {
			document.documentElement.classList.remove('theme-transition');
		});
	}
</script>

<button
	type="button"
	onclick={toggleTheme}
	class="relative inline-flex items-center justify-center w-9 h-9 rounded-full border border-light-border dark:border-dark-border bg-light-surface/80 dark:bg-dark-surface/80 text-ink dark:text-dark-text hover:border-accent dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-dark transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
	aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
	title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
>
	<!-- Morphing Sun/Moon SVG with Mask Technique -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		class="w-4 h-4 text-ink dark:text-dark-text transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] {isDark ? 'rotate-[35deg]' : 'rotate-0'}"
		fill="none"
		aria-hidden="true"
	>
		<defs>
			<!-- Dynamic Moon Cutout Mask -->
			<mask id="theme-morph-mask">
				<rect x="0" y="0" width="100%" height="100%" fill="white" />
				<!-- Cutout circle slides into the center body to carve a crescent moon -->
				<circle
					cx={isDark ? '19' : '28'}
					cy={isDark ? '5' : '-2'}
					r="7"
					fill="black"
					class="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
				/>
			</mask>
		</defs>

		<!-- Core Celestial Circle (expands from sun core r=5 to moon body r=9) -->
		<circle
			cx="12"
			cy="12"
			r={isDark ? '9' : '5'}
			mask="url(#theme-morph-mask)"
			class="fill-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
		/>

		<!-- Sun Rays Group (smoothly rotate, scale down, and fade out into darkness) -->
		<g
			class="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center stroke-current stroke-2 {isDark ? 'opacity-0 scale-50 -rotate-45 pointer-events-none' : 'opacity-100 scale-100 rotate-0'}"
		>
			<line x1="12" y1="1" x2="12" y2="3" stroke-linecap="round" />
			<line x1="12" y1="21" x2="12" y2="23" stroke-linecap="round" />
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke-linecap="round" />
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke-linecap="round" />
			<line x1="1" y1="12" x2="3" y2="12" stroke-linecap="round" />
			<line x1="21" y1="12" x2="23" y2="12" stroke-linecap="round" />
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke-linecap="round" />
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke-linecap="round" />
		</g>
	</svg>
</button>

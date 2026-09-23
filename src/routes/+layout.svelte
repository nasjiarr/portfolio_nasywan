<script>
	import './layout.css';
	import { onMount, onDestroy } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Preloader from '$lib/components/Preloader.svelte';
	import { onNavigate } from '$app/navigation';
	import { CustomCursor, initGSAP, initSmoothScroll, getLenis, destroySmoothScroll, shouldReduceMotion } from '$lib/animations';

	let { children } = $props();

	onMount(() => {
		initSmoothScroll();
	});

	onDestroy(() => {
		destroySmoothScroll();
	});

	onNavigate((navigation) => {
		// Reset scroll position via Lenis or native
		const lenis = getLenis();
		if (lenis) {
			lenis.scrollTo(0, { immediate: true });
		} else if (typeof window !== 'undefined') {
			window.scrollTo(0, 0);
		}

		// Refresh GSAP ScrollTrigger calculations on navigation
		if (typeof window !== 'undefined') {
			const gsapContext = initGSAP();
			if (gsapContext) {
				setTimeout(() => {
					gsapContext.ScrollTrigger.refresh();
				}, 120);
			}
		}

		// Strictly respect prefers-reduced-motion setting
		if (shouldReduceMotion()) {
			return;
		}

		// Check for browser support of View Transitions API
		if (!document.startViewTransition) {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>Studio Folio — Portfolio</title>
	<meta name="description" content="Personal portfolio and creative works" />
</svelte:head>

<!-- First Load Monogram Preloader -->
<Preloader />

<!-- Custom Interactive Magnetic / Trailing Cursor (Disabled on mobile/touch & reduced motion) -->
<CustomCursor />

<div class="min-h-screen flex flex-col bg-paper text-ink dark:bg-dark-bg dark:text-dark-text selection:bg-accent-light dark:selection:bg-accent/30 selection:text-accent dark:selection:text-accent-dark transition-colors duration-200 overflow-x-clip">
	<Navbar />

	<main class="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-12 md:py-16">
		{@render children()}
	</main>

	<footer class="w-full border-t border-light-border dark:border-dark-border py-8 pb-[max(2rem,env(safe-area-inset-bottom))] text-center text-xs text-light-muted dark:text-dark-muted transition-colors duration-200">
		<div class="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
			<p>© {new Date().getFullYear()} Studio Folio. All rights reserved.</p>
			<p class="font-serif italic text-sm text-ink/70 dark:text-dark-text/70">Crafted with precision &amp; care</p>
		</div>
	</footer>
</div>

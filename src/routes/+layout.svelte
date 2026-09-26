<script>
	import './layout.css';
	import { onMount, onDestroy } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Preloader from '$lib/components/Preloader.svelte';
	import NavigationProgressBar from '$lib/components/NavigationProgressBar.svelte';
	import { onNavigate } from '$app/navigation';
	import {
		CustomCursor,
		initGSAP,
		initSmoothScroll,
		getLenis,
		destroySmoothScroll,
		shouldReduceMotion
	} from '$lib/animations';
	import {
		determineTransitionType,
		setPageTransitioning
	} from '$lib/animations/navigationCoordinator.js';

	let { children } = $props();
	let progressBar = $state(/** @type {any} */ (null));

	onMount(() => {
		initSmoothScroll();
	});

	onDestroy(() => {
		destroySmoothScroll();
	});

	onNavigate((navigation) => {
		const lenis = getLenis();

		// Strictly respect prefers-reduced-motion setting: instant transition without animation
		if (shouldReduceMotion()) {
			if (lenis) {
				lenis.scrollTo(0, { immediate: true });
			} else if (typeof window !== 'undefined') {
				window.scrollTo(0, 0);
			}
			return;
		}

		// Start thin progress bar indicator (skips if transition completes in < 180ms)
		progressBar?.start();
		setPageTransitioning(true);

		// Determine transition context (shared-project, project-slide-next, project-slide-prev, or page-slide)
		const transitionType = determineTransitionType(
			navigation.from?.url.pathname,
			navigation.to?.url.pathname
		);
		document.documentElement.dataset.transition = transitionType;

		// Smooth Lenis scroll reset: smoothly glide to top if scrolled, otherwise immediate
		if (lenis) {
			if (typeof window !== 'undefined' && window.scrollY > 120) {
				lenis.scrollTo(0, { immediate: false, duration: 0.35 });
			} else {
				lenis.scrollTo(0, { immediate: true });
			}
		} else if (typeof window !== 'undefined') {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}

		// Fallback for browsers without View Transitions API (Smooth fade fallback)
		// @ts-ignore
		if (!document.startViewTransition) {
			return new Promise(async (resolve) => {
				const main = document.getElementById('main-content');
				if (main) {
					main.style.transition = 'opacity 160ms ease-out, transform 160ms ease-out';
					main.style.opacity = '0';
					main.style.transform = 'translateY(-12px)';
					await new Promise((r) => setTimeout(r, 160));
				}

				resolve();
				await navigation.complete;

				// Scroll reset to top of new page
				if (lenis) {
					lenis.scrollTo(0, { immediate: true });
				} else if (typeof window !== 'undefined') {
					window.scrollTo(0, 0);
				}

				delete document.documentElement.dataset.transition;
				setPageTransitioning(false);
				progressBar?.finish();

				if (main) {
					main.style.transform = 'translateY(16px)';
					main.style.opacity = '0';
					void main.offsetHeight; // Force reflow
					main.style.transition = 'opacity 220ms ease-out, transform 220ms ease-out';
					main.style.opacity = '1';
					main.style.transform = 'translateY(0)';
					main.focus({ preventScroll: true });
					setTimeout(() => {
						if (main) {
							main.style.transition = '';
							main.style.transform = '';
							main.style.opacity = '';
						}
					}, 240);
				}
			});
		}

		// Native View Transitions API
		// @ts-ignore
		return new Promise((resolve) => {
			// @ts-ignore
			const transition = document.startViewTransition(async () => {
				resolve();
				await navigation.complete;

				// Reset scroll position to top of new page
				if (lenis) {
					lenis.scrollTo(0, { immediate: true });
				} else if (typeof window !== 'undefined') {
					window.scrollTo(0, 0);
				}
			});

			transition.finished.finally(() => {
				delete document.documentElement.dataset.transition;
				setPageTransitioning(false);
				progressBar?.finish();

				// Ensure scroll position is reset at top of new page
				if (lenis) {
					lenis.scrollTo(0, { immediate: true });
				} else if (typeof window !== 'undefined') {
					window.scrollTo(0, 0);
				}

				// Accessibility: Shift keyboard focus to the main content area of the new page
				const main = document.getElementById('main-content');
				if (main) {
					main.focus({ preventScroll: true });
				}

				// Refresh GSAP ScrollTrigger calculations
				if (typeof window !== 'undefined') {
					const gsapContext = initGSAP();
					if (gsapContext) {
						setTimeout(() => {
							gsapContext.ScrollTrigger.refresh();
						}, 80);
					}
				}
			});
		});
	});
</script>

<svelte:head>
	<title>nasywandev — Software Engineering</title>
	<meta name="description" content="Personal portfolio and creative works" />
</svelte:head>

<!-- Top Thin Navigation Progress Indicator -->
<NavigationProgressBar bind:this={progressBar} />

<!-- First Load Monogram Preloader -->
<Preloader />

<!-- Custom Interactive Magnetic / Trailing Cursor (Disabled on mobile/touch & reduced motion) -->
<CustomCursor />

<div class="min-h-screen flex flex-col bg-paper text-ink dark:bg-dark-bg dark:text-dark-text selection:bg-accent-light dark:selection:bg-accent/30 selection:text-accent dark:selection:text-accent-dark transition-colors duration-200 overflow-x-clip">
	<Navbar />

	<main id="main-content" tabindex="-1" class="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-12 md:py-16 focus:outline-none">
		{@render children()}
	</main>

	<footer class="w-full border-t border-light-border dark:border-dark-border py-8 pb-[max(2rem,env(safe-area-inset-bottom))] text-center text-xs text-light-muted dark:text-dark-muted transition-colors duration-200">
		<div class="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
			<p>© {new Date().getFullYear()} nasywandev. All rights reserved.</p>
			<p class="font-serif italic text-sm text-ink/70 dark:text-dark-text/70">Crafted with precision &amp; care</p>
		</div>
	</footer>
</div>

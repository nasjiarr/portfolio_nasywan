<script>
	import { onMount } from 'svelte';
	import { pauseScroll, resumeScroll } from '$lib/animations';
	import { shouldReduceMotion, markPortfolioReady } from '$lib/animations/motionHelper.js';

	let showPreloader = $state(false);
	let isClosing = $state(false);
	let progress = $state(0);

	onMount(() => {
		// If user has visited in this session or reduced motion is preferred, skip preloader
		const hasVisited = sessionStorage.getItem('portfolio_visited');

		if (hasVisited || shouldReduceMotion()) {
			showPreloader = false;
			markPortfolioReady();
			return;
		}

		// First load in session: show preloader
		showPreloader = true;
		pauseScroll();

		// Progress line animation
		const startTime = performance.now();
		const duration = 750; // ms

		/** @param {number} currentTime */
		const animateProgress = (currentTime) => {
			const elapsed = currentTime - startTime;
			const p = Math.min(1, elapsed / duration);
			progress = Math.round(p * 100);

			if (p < 1) {
				requestAnimationFrame(animateProgress);
			} else {
				// Start exit curtain transition
				setTimeout(() => {
					isClosing = true;
					// Trigger page entrance animations right as curtain begins sliding open
					markPortfolioReady();

					setTimeout(() => {
						showPreloader = false;
						sessionStorage.setItem('portfolio_visited', 'true');
						resumeScroll();
					}, 480);
				}, 120);
			}
		};

		requestAnimationFrame(animateProgress);
	});
</script>

{#if showPreloader}
	<div
		aria-hidden="true"
		class="fixed inset-0 z-[10000] flex flex-col items-center justify-between p-8 sm:p-12 bg-paper dark:bg-dark-bg text-ink dark:text-dark-text transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none pointer-events-auto {isClosing
			? '-translate-y-full'
			: 'translate-y-0'}"
	>
		<!-- Top Status Bar -->
		<div class="w-full flex items-center justify-between text-[11px] tracking-widest uppercase font-mono text-light-muted dark:text-dark-muted">
			<span>Studio Folio</span>
			<span class="text-accent dark:text-accent-dark">2026</span>
		</div>

		<!-- Center Monogram & Typography -->
		<div class="flex flex-col items-center text-center space-y-5">
			<!-- Monogram Circle -->
			<div class="w-16 h-16 rounded-full border border-light-border dark:border-dark-border flex items-center justify-center bg-light-surface/60 dark:bg-dark-surface/60 shadow-sm">
				<span class="font-serif text-2xl text-accent dark:text-accent-dark tracking-tighter">SF</span>
			</div>

			<div class="space-y-1">
				<p class="font-serif text-2xl sm:text-3xl text-ink dark:text-dark-text tracking-wide">
					Nasywan Arsa
				</p>
				<p class="text-[11px] uppercase tracking-[0.28em] text-light-muted dark:text-dark-muted font-sans font-medium">
					Design &amp; Architecture
				</p>
			</div>
		</div>

		<!-- Bottom Progress Indicator -->
		<div class="w-full max-w-xs space-y-2">
			<div class="w-full h-px bg-light-border dark:bg-dark-border overflow-hidden relative">
				<div
					class="h-full bg-accent dark:bg-accent-dark transition-all duration-75 ease-out"
					style="width: {progress}%;"
				></div>
			</div>
			<div class="flex justify-between items-center text-[10px] font-mono text-light-muted dark:text-dark-muted">
				<span>Memuat Ruang Kerja</span>
				<span>{progress}%</span>
			</div>
		</div>
	</div>
{/if}

<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { shouldReduceMotion, isTouchOnlyDevice } from './motionHelper.js';

	let dotEl = $state(/** @type {HTMLDivElement | null} */ (null));
	let ringEl = $state(/** @type {HTMLDivElement | null} */ (null));

	let isEnabled = $state(false);
	let isVisible = $state(false);
	let isHovering = $state(false);
	let isCardHovering = $state(false);

	onMount(() => {
		// Strictly disable custom cursor on touch-only devices and when reduced motion is preferred
		if (isTouchOnlyDevice() || shouldReduceMotion()) {
			isEnabled = false;
			return;
		}

		if (!dotEl || !ringEl) return;
		isEnabled = true;

		const setDotX = gsap.quickTo(dotEl, 'x', { duration: 0.08, ease: 'power3.out' });
		const setDotY = gsap.quickTo(dotEl, 'y', { duration: 0.08, ease: 'power3.out' });

		const setRingX = gsap.quickTo(ringEl, 'x', { duration: 0.32, ease: 'power3.out' });
		const setRingY = gsap.quickTo(ringEl, 'y', { duration: 0.32, ease: 'power3.out' });

		/** @param {MouseEvent} e */
		const handleMouseMove = (e) => {
			if (!isVisible && isEnabled) isVisible = true;

			setDotX(e.clientX);
			setDotY(e.clientY);

			setRingX(e.clientX);
			setRingY(e.clientY);
		};

		/** @param {MouseEvent} e */
		const handleMouseOver = (e) => {
			const target = /** @type {HTMLElement | null} */ (e.target);
			if (!target) return;

			const isCard = target.closest('[data-cursor="view"]');
			const isInteractive = target.closest('a, button, [role="button"], input, textarea, select');

			if (isCard) {
				isCardHovering = true;
				isHovering = true;
			} else if (isInteractive) {
				isHovering = true;
				isCardHovering = false;
			} else {
				isHovering = false;
				isCardHovering = false;
			}
		};

		const handleMouseLeave = () => {
			isVisible = false;
		};

		const handleMouseEnter = () => {
			if (isEnabled) isVisible = true;
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseover', handleMouseOver);
		document.addEventListener('mouseleave', handleMouseLeave);
		document.addEventListener('mouseenter', handleMouseEnter);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseover', handleMouseOver);
			document.removeEventListener('mouseleave', handleMouseLeave);
			document.removeEventListener('mouseenter', handleMouseEnter);
		};
	});
</script>

<!-- Center Dot (Always mounted in DOM to guarantee non-null ref onMount) -->
<div
	bind:this={dotEl}
	class="fixed top-0 left-0 pointer-events-none z-[9999] w-2 h-2 -ml-1 -mt-1 rounded-full bg-accent dark:bg-accent-dark transition-opacity duration-200 {isEnabled &&
	isVisible
		? 'opacity-100'
		: 'opacity-0'} {isCardHovering ? 'scale-0' : 'scale-100'}"
></div>

<!-- Trailing Magnetic Ring (Always mounted in DOM to guarantee non-null ref onMount) -->
<div
	bind:this={ringEl}
	class="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50 dark:border-accent-dark/50 transition-all duration-300 ease-out {isEnabled &&
	isVisible
		? 'opacity-100'
		: 'opacity-0'} {isCardHovering
		? 'w-16 h-16 bg-accent/20 dark:bg-accent/30 backdrop-blur-[2px] border-accent dark:border-accent-dark scale-100'
		: isHovering
			? 'w-11 h-11 bg-accent/10 dark:bg-accent/20 border-accent dark:border-accent-dark scale-100'
			: 'w-7 h-7 bg-transparent scale-100'}"
>
	{#if isCardHovering}
		<span class="text-[10px] font-sans font-medium tracking-widest uppercase text-accent dark:text-accent-dark">
			View
		</span>
	{/if}
</div>


<script>
	import { onMount, onDestroy } from 'svelte';
	import { shouldReduceMotion, isTouchOnlyDevice } from '$lib/animations/motionHelper.js';

	/**
	 * @typedef {Object} Props
	 * @property {number} [size=620] - Diameter radial glow dalam pixel
	 * @property {string} [color=''] - Custom warna radial glow (fallback ke CSS variable --color-accent-glow)
	 * @property {string} [class] - Custom class container
	 */

	/** @type {Props} */
	let {
		size = 620,
		color = '',
		class: className = ''
	} = $props();

	let containerEl = $state(/** @type {HTMLDivElement | null} */ (null));
	let glowEl = $state(/** @type {HTMLDivElement | null} */ (null));

	let isEnabled = $state(false);
	let isVisible = $state(false);

	let targetX = 0;
	let targetY = 0;
	let currentX = 0;
	let currentY = 0;
	let isLooping = false;
	/** @type {number | null} */
	let rafId = null;

	onMount(() => {
		// WAJIB nonaktif otomatis di touch device/mobile dan jika prefers-reduced-motion aktif
		if (isTouchOnlyDevice() || shouldReduceMotion()) {
			isEnabled = false;
			return;
		}

		isEnabled = true;
		const parent = containerEl?.parentElement;
		if (!parent) return;

		// Initial position at center of parent container
		const initialRect = parent.getBoundingClientRect();
		targetX = initialRect.width / 2;
		targetY = Math.min(initialRect.height / 2, 280);
		currentX = targetX;
		currentY = targetY;

		if (containerEl) {
			containerEl.style.setProperty('--x', `${currentX.toFixed(1)}px`);
			containerEl.style.setProperty('--y', `${currentY.toFixed(1)}px`);
		}

		const loop = () => {
			const dx = targetX - currentX;
			const dy = targetY - currentY;

			// LERP easing: 0.085 for physical momentum and smooth delay
			currentX += dx * 0.085;
			currentY += dy * 0.085;

			if (containerEl) {
				containerEl.style.setProperty('--x', `${currentX.toFixed(1)}px`);
				containerEl.style.setProperty('--y', `${currentY.toFixed(1)}px`);
			}

			// Save CPU/battery: pause RAF when cursor is stationary and delta is negligible
			if (Math.abs(dx) < 0.15 && Math.abs(dy) < 0.15 && !isVisible) {
				isLooping = false;
				rafId = null;
				return;
			}

			rafId = requestAnimationFrame(loop);
		};

		const startLoopIfNeeded = () => {
			if (!isLooping) {
				isLooping = true;
				rafId = requestAnimationFrame(loop);
			}
		};

		/** @param {MouseEvent} e */
		const handleMouseMove = (e) => {
			if (!isEnabled || !parent) return;
			const rect = parent.getBoundingClientRect();
			targetX = e.clientX - rect.left;
			targetY = e.clientY - rect.top;

			if (!isVisible) {
				isVisible = true;
			}

			startLoopIfNeeded();
		};

		const handleMouseEnter = () => {
			if (isEnabled) {
				isVisible = true;
				startLoopIfNeeded();
			}
		};

		const handleMouseLeave = () => {
			isVisible = false;
		};

		parent.addEventListener('mousemove', handleMouseMove, { passive: true });
		parent.addEventListener('mouseenter', handleMouseEnter);
		parent.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			parent.removeEventListener('mousemove', handleMouseMove);
			parent.removeEventListener('mouseenter', handleMouseEnter);
			parent.removeEventListener('mouseleave', handleMouseLeave);
			if (rafId) {
				cancelAnimationFrame(rafId);
			}
		};
	});

	onDestroy(() => {
		if (rafId) {
			cancelAnimationFrame(rafId);
		}
	});
</script>

<div
	bind:this={containerEl}
	aria-hidden="true"
	class="pointer-events-none absolute -inset-6 sm:-inset-16 overflow-hidden rounded-3xl -z-0 select-none {className}"
	style:display={isEnabled ? 'block' : 'none'}
>
	<div
		bind:this={glowEl}
		class="absolute inset-0 transition-opacity duration-700 ease-out {isVisible
			? 'opacity-100'
			: 'opacity-0'}"
		style="background: radial-gradient({size}px circle at var(--x, 50%) var(--y, 50%), {color ||
			'var(--color-accent-glow)'}, transparent 70%); will-change: opacity;"
	></div>
</div>

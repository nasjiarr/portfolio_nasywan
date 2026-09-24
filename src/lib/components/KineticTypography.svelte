<script>
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { shouldReduceMotion } from '$lib/animations/motionHelper.js';

	/**
	 * @typedef {Object} Props
	 * @property {string[]} [words] - Daftar kata/role yang akan di-looping
	 * @property {number} [interval=2400] - Durasi tampil tiap kata dalam ms (~2-2.5s)
	 * @property {number} [duration=0.46] - Durasi transisi kata dalam detik (400-500ms)
	 * @property {string} [class] - Custom class styling
	 */

	/** @type {Props} */
	let {
		words = ['Design Engineer', 'Frontend Architect', 'Creative Developer', 'Interface Craftsman'],
		interval = 2400,
		duration = 0.46,
		class: className = ''
	} = $props();

	let containerEl = $state(/** @type {HTMLSpanElement | null} */ (null));
	let measureEl = $state(/** @type {HTMLSpanElement | null} */ (null));
	let currentWordEl = $state(/** @type {HTMLSpanElement | null} */ (null));
	let nextWordEl = $state(/** @type {HTMLSpanElement | null} */ (null));

	let currentIndex = $state(0);
	let currentWord = $derived(words[currentIndex] || 'Design Engineer');
	let nextIndex = $derived((currentIndex + 1) % (words.length || 1));
	let nextWord = $derived(words[nextIndex] || currentWord);

	let isAnimating = false;
	/** @type {ReturnType<typeof setInterval> | null} */
	let timer = null;

	/** @param {string} text */
	function measureWidth(text) {
		if (!measureEl) return 0;
		measureEl.textContent = text;
		return Math.ceil(measureEl.getBoundingClientRect().width) + 3;
	}

	/**
	 * Update lebar container secara dinamis untuk mencegah layout shift (CLS)
	 * @param {string} text
	 */
	function updateWidth(text) {
		if (!containerEl) return;
		const w = measureWidth(text);
		if (w > 0) {
			containerEl.style.width = `${w}px`;
		}
	}

	function triggerNextWord() {
		// Jangan jalankan jika sedang animasi, tab sedang di-background, atau kata <= 1
		if (isAnimating || (typeof document !== 'undefined' && document.hidden) || words.length <= 1) {
			return;
		}
		if (!currentWordEl || !nextWordEl || !containerEl) return;

		isAnimating = true;
		const targetIndex = (currentIndex + 1) % words.length;
		const incomingWord = words[targetIndex] || '';

		// Siapkan teks pada elemen incoming & ghost measuring
		nextWordEl.textContent = incomingWord;

		// Animate container width smoothly with cubic-bezier transition
		updateWidth(incomingWord);

		// Posisikan incoming word di bawah dengan clip-path
		gsap.set(nextWordEl, {
			yPercent: 100,
			opacity: 0,
			clipPath: 'inset(0% 0% 100% 0%)'
		});

		const tl = gsap.timeline({
			onComplete: () => {
				currentIndex = targetIndex;
				if (currentWordEl && nextWordEl) {
					currentWordEl.textContent = incomingWord;
					gsap.set(currentWordEl, {
						yPercent: 0,
						opacity: 1,
						clipPath: 'inset(0% 0% 0% 0%)'
					});
					gsap.set(nextWordEl, {
						opacity: 0
					});
				}
				isAnimating = false;
			}
		});

		// Kata lama: keluar ke atas dengan slide + clip-path
		tl.to(
			currentWordEl,
			{
				yPercent: -100,
				opacity: 0,
				clipPath: 'inset(100% 0% 0% 0%)',
				duration,
				ease: 'power3.inOut'
			},
			0
		);

		// Kata baru: masuk dari bawah dengan slide + clip-path
		tl.to(
			nextWordEl,
			{
				yPercent: 0,
				opacity: 1,
				clipPath: 'inset(0% 0% 0% 0%)',
				duration,
				ease: 'power3.out'
			},
			0.02
		);
	}

	onMount(() => {
		// Set lebar awal sesuai kata pertama
		updateWidth(currentWord);

		// Hormati prefers-reduced-motion: tampilkan statis jika user mematikan animasi
		if (shouldReduceMotion() || words.length <= 1) {
			return;
		}

		timer = setInterval(triggerNextWord, interval);

		const handleResize = () => {
			if (words[currentIndex]) {
				updateWidth(words[currentIndex]);
			}
		};

		window.addEventListener('resize', handleResize, { passive: true });

		return () => {
			if (timer) clearInterval(timer);
			window.removeEventListener('resize', handleResize);
		};
	});

	onDestroy(() => {
		if (timer) clearInterval(timer);
	});
</script>

<!-- Ghost measuring element (untuk pengukuran lebar subpixel tanpa layout shift) -->
<span
	bind:this={measureEl}
	aria-hidden="true"
	class="invisible absolute pointer-events-none whitespace-nowrap opacity-0 select-none {className}"
>
	{currentWord}
</span>

<!-- Dynamic Kinetic Typography Container -->
<span
	bind:this={containerEl}
	class="kinetic-wrapper inline-flex relative overflow-hidden align-baseline select-none transition-[width] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] font-normal text-ink dark:text-dark-text border-b border-accent/40 dark:border-accent-dark/40 pb-0.5 {className}"
	style="height: 1.3em; vertical-align: -0.22em;"
	aria-live="polite"
	aria-label={currentWord}
>
	<!-- Current Visible Word -->
	<span
		bind:this={currentWordEl}
		class="kinetic-word absolute inset-0 flex items-center whitespace-nowrap"
	>
		{currentWord}
	</span>

	<!-- Next Incoming Word (animated from bottom) -->
	<span
		bind:this={nextWordEl}
		aria-hidden="true"
		class="kinetic-word absolute inset-0 flex items-center whitespace-nowrap opacity-0"
	>
		{nextWord}
	</span>
</span>

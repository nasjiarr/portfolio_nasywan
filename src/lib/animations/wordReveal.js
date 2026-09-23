import { initGSAP } from './gsapHelper.js';

/**
 * @typedef {Object} WordRevealOptions
 * @property {number} [delay=0.15] - Initial delay in seconds
 * @property {number} [stagger=0.06] - Stagger interval between words in seconds
 * @property {number} [duration=0.8] - Duration of each word animation in seconds
 */

/**
 * Svelte Action to split text into words and animate them with a blur-to-focus staggered reveal.
 * Respects prefers-reduced-motion.
 *
 * @param {HTMLElement} node
 * @param {WordRevealOptions} [options]
 * @returns {{ destroy: () => void }}
 */
export function wordReveal(node, options = {}) {
	if (typeof window === 'undefined') {
		return { destroy: () => {} };
	}

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReducedMotion) {
		return { destroy: () => {} };
	}

	const gsapContext = initGSAP();
	if (!gsapContext) {
		return { destroy: () => {} };
	}

	const { gsap } = gsapContext;
	const delay = options.delay ?? 0.15;
	const stagger = options.stagger ?? 0.055;
	const duration = options.duration ?? 0.8;

	const rawText = node.innerText.trim();
	const words = rawText.split(/\s+/);

	// Clear text and insert wrapped word spans
	node.innerHTML = '';
	const spans = words.map((word, i) => {
		const span = document.createElement('span');
		span.innerText = word + (i < words.length - 1 ? '\u00A0' : '');
		span.style.display = 'inline-block';
		span.style.willChange = 'opacity, transform, filter';
		node.appendChild(span);
		return span;
	});

	const tween = gsap.fromTo(
		spans,
		{
			opacity: 0,
			y: 22,
			filter: 'blur(10px)'
		},
		{
			opacity: 1,
			y: 0,
			filter: 'blur(0px)',
			duration,
			delay,
			stagger,
			ease: 'power2.out',
			onComplete() {
				spans.forEach((s) => {
					s.style.filter = '';
					s.style.willChange = 'auto';
				});
			}
		}
	);

	return {
		destroy() {
			tween.kill();
			node.innerText = rawText;
		}
	};
}

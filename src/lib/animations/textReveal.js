import { initGSAP } from './gsapHelper.js';

/**
 * @typedef {Object} CurtainRevealOptions
 * @property {number} [duration=0.9] - Duration in seconds
 * @property {number} [delay=0] - Delay in seconds
 * @property {string} [start='top 88%'] - ScrollTrigger start position
 */

/**
 * Svelte Action to reveal text with a smooth curtain / clip-path effect on scroll.
 * Strictly respects prefers-reduced-motion.
 *
 * @param {HTMLElement} node
 * @param {CurtainRevealOptions} [options]
 * @returns {{ destroy: () => void }}
 */
export function curtainReveal(node, options = {}) {
	if (typeof window === 'undefined') {
		return { destroy: () => {} };
	}

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReducedMotion) {
		node.style.clipPath = 'none';
		node.style.transform = 'none';
		node.style.opacity = '1';
		return { destroy: () => {} };
	}

	const gsapContext = initGSAP();
	if (!gsapContext) {
		return { destroy: () => {} };
	}

	const { gsap } = gsapContext;
	const duration = options.duration ?? 0.9;
	const delay = options.delay ?? 0;
	const start = options.start ?? 'top 88%';

	const tween = gsap.fromTo(
		node,
		{
			clipPath: 'inset(100% 0% 0% 0%)',
			y: 32,
			opacity: 0
		},
		{
			clipPath: 'inset(0% 0% 0% 0%)',
			y: 0,
			opacity: 1,
			duration,
			delay,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: node,
				start,
				once: true
			}
		}
	);

	return {
		destroy() {
			if (tween.scrollTrigger) {
				tween.scrollTrigger.kill();
			}
			tween.kill();
		}
	};
}

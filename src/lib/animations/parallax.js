import { initGSAP } from './gsapHelper.js';

/**
 * @typedef {Object} ParallaxOptions
 * @property {number} [speed=40] - Vertical travel distance in pixels
 */

/**
 * Svelte Action for subtle scroll-based parallax on mockups and images.
 * Respects prefers-reduced-motion.
 *
 * @param {HTMLElement} node
 * @param {ParallaxOptions} [options]
 * @returns {{ destroy: () => void }}
 */
export function parallax(node, options = {}) {
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
	const speed = options.speed ?? 40;

	node.style.willChange = 'transform';

	const tween = gsap.fromTo(
		node,
		{
			y: -speed / 2
		},
		{
			y: speed / 2,
			ease: 'none',
			scrollTrigger: {
				trigger: node.parentElement || node,
				start: 'top bottom',
				end: 'bottom top',
				scrub: 1
			}
		}
	);

	return {
		destroy() {
			if (tween.scrollTrigger) {
				tween.scrollTrigger.kill();
			}
			tween.kill();
			node.style.transform = '';
			node.style.willChange = 'auto';
		}
	};
}

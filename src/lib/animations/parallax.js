import { initGSAP } from './gsapHelper.js';
import { shouldReduceMotion, isTouchOnlyDevice, onPortfolioReady } from './motionHelper.js';

/**
 * @typedef {Object} ParallaxOptions
 * @property {number} [speed=40] - Vertical travel distance in pixels
 */

/**
 * Svelte Action for subtle scroll-based parallax on mockups and images.
 * Respects prefers-reduced-motion and softens on touch screens.
 *
 * @param {HTMLElement} node
 * @param {ParallaxOptions} [options]
 * @returns {{ destroy: () => void }}
 */
export function parallax(node, options = {}) {
	if (typeof window === 'undefined') {
		return { destroy: () => {} };
	}

	if (shouldReduceMotion()) {
		return { destroy: () => {} };
	}

	const gsapContext = initGSAP();
	if (!gsapContext) {
		return { destroy: () => {} };
	}

	const { gsap } = gsapContext;
	const isTouch = isTouchOnlyDevice();
	const baseSpeed = options.speed ?? 40;
	const speed = isTouch ? Math.round(baseSpeed * 0.4) : baseSpeed;

	node.style.willChange = 'transform';

	/** @type {gsap.core.Tween | null} */
	let tween = null;

	onPortfolioReady(() => {
		tween = gsap.fromTo(
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
					scrub: isTouch ? 0.3 : 1
				}
			}
		);
	});

	return {
		destroy() {
			if (tween) {
				if (tween.scrollTrigger) {
					tween.scrollTrigger.kill();
				}
				tween.kill();
			}
			node.style.transform = '';
			node.style.willChange = 'auto';
		}
	};
}

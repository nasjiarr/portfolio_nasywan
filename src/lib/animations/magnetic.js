import { gsap } from 'gsap';

/**
 * @typedef {Object} MagneticOptions
 * @property {number} [strength=0.35] - Magnetic pull strength (0 to 1)
 */

/**
 * Svelte Action to give elements a magnetic attraction to the cursor.
 * Automatically disabled on touch screens and under prefers-reduced-motion.
 *
 * @param {HTMLElement} node
 * @param {MagneticOptions} [options]
 * @returns {{ destroy: () => void, update: (newOptions?: MagneticOptions) => void }}
 */
export function magnetic(node, options = {}) {
	if (typeof window === 'undefined') {
		return { destroy: () => {}, update: () => {} };
	}

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

	if (prefersReducedMotion || isTouch) {
		return { destroy: () => {}, update: () => {} };
	}

	let strength = options.strength ?? 0.35;

	/** @param {MouseEvent} e */
	const handleMouseMove = (e) => {
		const rect = node.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const deltaX = (e.clientX - centerX) * strength;
		const deltaY = (e.clientY - centerY) * strength;

		gsap.to(node, {
			x: deltaX,
			y: deltaY,
			duration: 0.3,
			ease: 'power2.out',
			overwrite: 'auto'
		});
	};

	const handleMouseLeave = () => {
		gsap.to(node, {
			x: 0,
			y: 0,
			duration: 0.7,
			ease: 'elastic.out(1.1, 0.4)',
			overwrite: 'auto'
		});
	};

	node.addEventListener('mousemove', handleMouseMove);
	node.addEventListener('mouseleave', handleMouseLeave);

	return {
		update(newOptions = {}) {
			strength = newOptions.strength ?? strength;
		},
		destroy() {
			node.removeEventListener('mousemove', handleMouseMove);
			node.removeEventListener('mouseleave', handleMouseLeave);
			gsap.killTweensOf(node);
		}
	};
}

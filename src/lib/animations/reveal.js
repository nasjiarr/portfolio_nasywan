/**
 * @typedef {Object} RevealOptions
 * @property {number} [delay] - Delay in milliseconds before animation starts
 * @property {number} [y] - Distance in pixels to slide up from
 * @property {number} [duration] - Duration in milliseconds
 * @property {number} [threshold] - Intersection threshold ratio
 * @property {boolean} [once] - Trigger reveal only once
 */

/**
 * Svelte Action for scroll reveal animation using IntersectionObserver.
 * Strictly respects prefers-reduced-motion.
 *
 * @param {HTMLElement} node
 * @param {RevealOptions} [options]
 * @returns {{ destroy: () => void, update: (newOptions?: RevealOptions) => void }}
 */
export function reveal(node, options = {}) {
	if (typeof window === 'undefined') {
		return { destroy: () => {}, update: () => {} };
	}

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// Fallback instantly if reduced motion is requested
	if (prefersReducedMotion) {
		node.style.opacity = '1';
		node.style.transform = 'none';
		return { destroy: () => {}, update: () => {} };
	}

	let delay = options.delay ?? 0;
	let y = options.y ?? 24;
	let duration = options.duration ?? 600;
	let threshold = options.threshold ?? 0.12;
	let once = options.once ?? true;

	// Initial hidden state
	node.style.opacity = '0';
	node.style.transform = `translateY(${y}px)`;
	node.style.willChange = 'opacity, transform';
	node.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.style.opacity = '1';
					node.style.transform = 'translateY(0)';

					if (once) {
						observer.unobserve(node);
						observer.disconnect();

						// Clean up will-change after transition finishes
						setTimeout(() => {
							node.style.willChange = 'auto';
						}, delay + duration + 50);
					}
				} else if (!once) {
					node.style.opacity = '0';
					node.style.transform = `translateY(${y}px)`;
				}
			}
		},
		{
			threshold
		}
	);

	observer.observe(node);

	return {
		update(newOptions = {}) {
			delay = newOptions.delay ?? delay;
			y = newOptions.y ?? y;
			duration = newOptions.duration ?? duration;
			node.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
		},
		destroy() {
			observer.disconnect();
		}
	};
}

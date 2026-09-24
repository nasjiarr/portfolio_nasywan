/**
 * Navigation Coordinator for Page Transitions
 * Manages transition type classification, timing, scroll coordination,
 * and page-settled callbacks for scroll reveal animations.
 */

import { shouldReduceMotion } from './motionHelper.js';

let isTransitioning = false;
/** @type {Array<() => void>} */
const settledCallbacks = [];

/** @type {'prev' | 'next' | null} */
let lastClickedDirection = null;

// Track clicked link direction (e.g. data-direction="prev" or "next")
if (typeof window !== 'undefined') {
	window.addEventListener(
		'click',
		(e) => {
			const target = /** @type {HTMLElement | null} */ (e.target);
			const link = target?.closest('a[data-direction]');
			if (link) {
				const dir = link.getAttribute('data-direction');
				lastClickedDirection = dir === 'prev' ? 'prev' : dir === 'next' ? 'next' : null;
			} else {
				lastClickedDirection = null;
			}
		},
		{ capture: true, passive: true }
	);
}

/**
 * Determines the appropriate View Transition type based on origin, destination,
 * and user click direction.
 *
 * @param {string | undefined} fromPath
 * @param {string | undefined} toPath
 * @returns {'shared-project' | 'project-slide-next' | 'project-slide-prev' | 'page-slide'}
 */
export function determineTransitionType(fromPath = '', toPath = '') {
	// Normalize paths without trailing slash ambiguity
	const cleanFrom = fromPath.replace(/\/+$/, '') || '/';
	const cleanTo = toPath.replace(/\/+$/, '') || '/';

	const isFromDetail = cleanFrom.startsWith('/projects/') && cleanFrom !== '/projects';
	const isToDetail = cleanTo.startsWith('/projects/') && cleanTo !== '/projects';

	// Case 1: Project detail to another Project detail (Next / Prev book slide)
	if (isFromDetail && isToDetail) {
		if (lastClickedDirection === 'prev') {
			lastClickedDirection = null;
			return 'project-slide-prev';
		}
		lastClickedDirection = null;
		return 'project-slide-next';
	}

	// Case 2: Grid/Home to Project detail OR Project detail back to Grid/Home
	// Uses shared element morph for the project image thumbnail
	if ((!isFromDetail && isToDetail) || (isFromDetail && !isToDetail)) {
		lastClickedDirection = null;
		return 'shared-project';
	}

	// Case 3: General page-to-page navigation (Home <-> About <-> Contact <-> Projects)
	lastClickedDirection = null;
	return 'page-slide';
}

/**
 * Sets transition state flag to coordinate with scroll-reveal animations.
 * @param {boolean} transitioning
 */
export function setPageTransitioning(transitioning) {
	isTransitioning = transitioning;
	if (!transitioning) {
		// Once transition settles, execute queued reveal callbacks after a calm 140ms delay
		setTimeout(() => {
			while (settledCallbacks.length > 0) {
				const cb = settledCallbacks.shift();
				if (cb) {
					try {
						cb();
					} catch (e) {
						console.error('[NavigationCoordinator] Settled callback error:', e);
					}
				}
			}
		}, 140);
	}
}

/**
 * Returns whether a view transition is currently running.
 * @returns {boolean}
 */
export function isPageTransitionActive() {
	return isTransitioning;
}

/**
 * Executes a callback after the current page transition has finished and settled,
 * or immediately if no transition is in flight.
 *
 * @param {() => void} callback
 */
export function onPageSettled(callback) {
	if (typeof window === 'undefined') return;

	if (!isTransitioning || shouldReduceMotion()) {
		callback();
		return;
	}

	settledCallbacks.push(callback);
}

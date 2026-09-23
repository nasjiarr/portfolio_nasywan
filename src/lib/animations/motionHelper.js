/**
 * Centralized motion preference and device capability detection helper.
 * Provides testing overrides for developers while strictly honoring
 * prefers-reduced-motion for end users by default.
 */

let portfolioReady = false;
/** @type {Array<() => void>} */
const readyCallbacks = [];

/**
 * Checks whether animations should be simplified/disabled.
 * Supports test overrides:
 * - URL param `?motion=1` or localStorage `force_motion: 'true'` forces motion ON.
 * - URL param `?motion=0` or localStorage `force_motion: 'false'` forces motion OFF.
 * Default: respects system `(prefers-reduced-motion: reduce)`.
 *
 * @returns {boolean}
 */
export function shouldReduceMotion() {
	if (typeof window === 'undefined') return true;

	try {
		const searchParams = new URLSearchParams(window.location.search);
		const motionParam = searchParams.get('motion');
		if (motionParam === '1') return false;
		if (motionParam === '0') return true;

		const storedForce = localStorage.getItem('force_motion');
		if (storedForce === 'true') return false;
		if (storedForce === 'false') return true;
	} catch {
		// Ignore any storage access errors
	}

	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Detects whether the current device is strictly a touch-only mobile/tablet device.
 * Uses CSS standard `(hover: none) and (pointer: coarse)`.
 * On Windows laptops with touchscreen displays (Surface, Yoga, XPS, etc.),
 * `hover: none` will be FALSE when a mouse/touchpad is available,
 * allowing magnetic buttons and custom cursor to work properly.
 *
 * @returns {boolean}
 */
export function isTouchOnlyDevice() {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

/**
 * Marks the initial page entrance / preloader as ready.
 * Triggers all queued above-the-fold entrance animations.
 */
export function markPortfolioReady() {
	portfolioReady = true;
	if (typeof window !== 'undefined') {
		/** @type {any} */ (window).__portfolioReady = true;
		window.dispatchEvent(new CustomEvent('portfolio:ready'));
	}
	while (readyCallbacks.length > 0) {
		const cb = readyCallbacks.shift();
		if (cb) {
			try {
				cb();
			} catch (e) {
				console.error('[Portfolio] Ready callback error:', e);
			}
		}
	}
}

/**
 * Executes a callback when the page has transitioned past the preloader
 * or immediately if no preloader is active in this session.
 *
 * @param {() => void} callback
 */
export function onPortfolioReady(callback) {
	if (typeof window === 'undefined') return;

	// Check if already marked ready
	if (portfolioReady || /** @type {any} */ (window).__portfolioReady) {
		callback();
		return;
	}

	// Check if preloader is skipped in this session or reduced motion is active
	const hasVisited = sessionStorage.getItem('portfolio_visited');
	if (hasVisited || shouldReduceMotion()) {
		portfolioReady = true;
		callback();
		return;
	}

	// Queue callback for when preloader curtain starts opening
	readyCallbacks.push(callback);
}

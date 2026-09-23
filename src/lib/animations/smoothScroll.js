import Lenis from 'lenis';
import { initGSAP } from './gsapHelper.js';

/** @type {Lenis | null} */
let lenisInstance = null;

/** @type {((time: number) => void) | null} */
let tickerCallback = null;

/** @type {((e: MouseEvent) => void) | null} */
let anchorClickHandler = null;

/**
 * Initializes Lenis smooth scrolling with GSAP ScrollTrigger synchronization.
 * If prefers-reduced-motion is active or running in SSR, it safely bypasses Lenis.
 * @returns {Lenis | null}
 */
export function initSmoothScroll() {
	if (typeof window === 'undefined') return null;

	// Respect prefers-reduced-motion: fallback to native instant scroll
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		return null;
	}

	if (lenisInstance) {
		return lenisInstance;
	}

	lenisInstance = new Lenis({
		duration: 1.15,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		wheelMultiplier: 1.0,
		touchMultiplier: 1.2,
		infinite: false
	});

	// Coordinate with GSAP ScrollTrigger & Ticker
	const gsapContext = initGSAP();
	if (gsapContext) {
		const { gsap, ScrollTrigger } = gsapContext;

		lenisInstance.on('scroll', ScrollTrigger.update);

		tickerCallback = (time) => {
			lenisInstance?.raf(time * 1000);
		};

		gsap.ticker.add(tickerCallback);
		gsap.ticker.lagSmoothing(0);
	}

	// Internal anchor smooth scrolling (#section)
	anchorClickHandler = (e) => {
		const target = /** @type {HTMLElement | null} */ (e.target);
		const link = target?.closest('a[href^="#"]');
		if (link && lenisInstance) {
			const hash = link.getAttribute('href');
			if (hash && hash !== '#') {
				const element = /** @type {HTMLElement | null} */ (document.querySelector(hash));
				if (element) {
					e.preventDefault();
					lenisInstance.scrollTo(element, { offset: -30, duration: 1.2 });
				}
			}
		}
	};

	document.addEventListener('click', anchorClickHandler);

	return lenisInstance;
}

/**
 * Returns current Lenis instance if active.
 * @returns {Lenis | null}
 */
export function getLenis() {
	return lenisInstance;
}

/**
 * Pauses scrolling during overlays or preloader.
 */
export function pauseScroll() {
	if (lenisInstance) {
		lenisInstance.stop();
	}
}

/**
 * Resumes scrolling after overlays or preloader finish.
 */
export function resumeScroll() {
	if (lenisInstance) {
		lenisInstance.start();
	}
}

/**
 * Tears down Lenis instance and detached event listeners.
 */
export function destroySmoothScroll() {
	if (typeof window === 'undefined') return;

	if (anchorClickHandler) {
		document.removeEventListener('click', anchorClickHandler);
		anchorClickHandler = null;
	}

	if (lenisInstance) {
		const gsapContext = initGSAP();
		if (gsapContext && tickerCallback) {
			gsapContext.gsap.ticker.remove(tickerCallback);
			tickerCallback = null;
		}
		lenisInstance.destroy();
		lenisInstance = null;
	}
}

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/**
 * Initializes and registers GSAP plugins safely in the browser.
 * @returns {{ gsap: typeof gsap, ScrollTrigger: typeof ScrollTrigger } | null}
 */
export function initGSAP() {
	if (typeof window === 'undefined') {
		return null;
	}

	if (!registered) {
		gsap.registerPlugin(ScrollTrigger);
		registered = true;
	}

	return { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger };

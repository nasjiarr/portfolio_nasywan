<script>
	import { onDestroy } from 'svelte';
	import { shouldReduceMotion } from '$lib/animations/motionHelper.js';

	let visible = $state(false);
	let progress = $state(0);
	/** @type {ReturnType<typeof setTimeout> | null} */
	let thresholdTimer = null;
	/** @type {ReturnType<typeof setTimeout> | null} */
	let finishTimer = null;

	export function start() {
		if (shouldReduceMotion()) return;
		if (finishTimer) clearTimeout(finishTimer);
		if (thresholdTimer) clearTimeout(thresholdTimer);

		progress = 0;
		// Skip indicator if transition is very fast (< 180ms threshold)
		thresholdTimer = setTimeout(() => {
			visible = true;
			progress = 75;
		}, 180);
	}

	export function finish() {
		if (thresholdTimer) {
			clearTimeout(thresholdTimer);
			thresholdTimer = null;
		}

		if (!visible) {
			progress = 0;
			return;
		}

		progress = 100;
		finishTimer = setTimeout(() => {
			visible = false;
			finishTimer = setTimeout(() => {
				progress = 0;
			}, 200);
		}, 160);
	}

	onDestroy(() => {
		if (thresholdTimer) clearTimeout(thresholdTimer);
		if (finishTimer) clearTimeout(finishTimer);
	});
</script>

{#if visible}
	<div
		aria-hidden="true"
		class="fixed top-0 left-0 right-0 h-[2.5px] z-[100] pointer-events-none bg-accent/20 dark:bg-accent-dark/20 overflow-hidden"
	>
		<div
			class="h-full bg-accent dark:bg-accent-dark transition-all duration-300 ease-out shadow-[0_0_10px_rgba(56,189,248,0.6)]"
			style="width: {progress}%;"
		></div>
	</div>
{/if}

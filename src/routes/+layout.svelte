<script>
	import './layout.css';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Studio Folio — Portfolio</title>
	<meta name="description" content="Personal portfolio and creative works" />
</svelte:head>

<div class="min-h-screen flex flex-col bg-paper text-ink dark:bg-dark-bg dark:text-dark-text selection:bg-accent-light dark:selection:bg-accent/30 selection:text-accent dark:selection:text-accent-dark transition-colors duration-200">
	<Navbar />

	<main class="flex-1 w-full max-w-5xl mx-auto px-6 py-10 sm:py-16">
		{@render children()}
	</main>

	<footer class="w-full border-t border-light-border dark:border-dark-border py-8 text-center text-xs text-light-muted dark:text-dark-muted transition-colors duration-200">
		<div class="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
			<p>© {new Date().getFullYear()} Studio Folio. All rights reserved.</p>
			<p class="font-serif italic text-sm text-ink/70 dark:text-dark-text/70">Crafted with precision &amp; care</p>
		</div>
	</footer>
</div>

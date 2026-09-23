<script>
	import { page } from '$app/state';
	import ThemeToggle from './ThemeToggle.svelte';

	const navItems = [
		{ name: 'Home', href: '/' },
		{ name: 'Projects', href: '/projects/' },
		{ name: 'About', href: '/about/' },
		{ name: 'Contact', href: '/contact/' }
	];

	/** @param {string} href */
	function isActive(href) {
		if (href === '/') {
			return page.url.pathname === '/';
		}
		return page.url.pathname.startsWith(href);
	}
</script>

<header class="sticky top-0 z-50 w-full border-b border-light-border dark:border-dark-border bg-paper/85 dark:bg-dark-bg/85 backdrop-blur-md transition-colors duration-200">
	<div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
		<!-- Brand Logo / Name -->
		<a
			href="/"
			class="group flex items-center gap-2 text-ink dark:text-dark-text font-serif text-2xl tracking-tight hover:text-accent dark:hover:text-accent-dark transition-colors"
		>
			<span class="w-2.5 h-2.5 rounded-full bg-accent dark:bg-accent-dark inline-block transition-transform duration-300 group-hover:scale-125"></span>
			<span class="font-normal">Studio</span>
			<span class="text-xs uppercase tracking-widest font-sans px-2 py-0.5 rounded border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted ml-1">
				Folio
			</span>
		</a>

		<!-- Navigation Links & Theme Toggle -->
		<div class="flex items-center gap-4 sm:gap-8">
			<nav class="flex items-center gap-1 sm:gap-2" aria-label="Main Navigation">
				{#each navItems as item}
					<a
						href={item.href}
						class="nav-link-animated text-sm font-medium transition-colors duration-150 {isActive(item.href)
							? 'active text-accent dark:text-accent-dark font-semibold'
							: 'text-light-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-text'}"
						aria-current={isActive(item.href) ? 'page' : undefined}
					>
						{item.name}
					</a>
				{/each}
			</nav>

			<div class="w-px h-5 bg-light-border dark:bg-dark-border"></div>

			<!-- Theme Toggle Button -->
			<ThemeToggle />
		</div>
	</div>
</header>

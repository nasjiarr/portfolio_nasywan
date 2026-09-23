<script>
	import { page } from '$app/state';
	import ThemeToggle from './ThemeToggle.svelte';
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';

	const navItems = [
		{ name: 'Home', href: '/', num: '01' },
		{ name: 'Projects', href: '/projects/', num: '02' },
		{ name: 'About', href: '/about/', num: '03' },
		{ name: 'Contact', href: '/contact/', num: '04' }
	];

	let isMenuOpen = $state(false);

	/** @param {string} href */
	function isActive(href) {
		if (href === '/') {
			return page.url.pathname === '/';
		}
		return page.url.pathname.startsWith(href);
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = isMenuOpen ? 'hidden' : '';
		}
	}

	function closeMenu() {
		if (isMenuOpen) {
			isMenuOpen = false;
			if (typeof document !== 'undefined') {
				document.body.style.overflow = '';
			}
		}
	}

	/** @param {KeyboardEvent} e */
	function handleKeydown(e) {
		if (e.key === 'Escape' && isMenuOpen) {
			closeMenu();
		}
	}

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="sticky top-0 z-50 w-full border-b border-light-border dark:border-dark-border bg-paper/90 dark:bg-dark-bg/90 backdrop-blur-md transition-colors duration-200">
	<div class="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
		<!-- Brand Logo / Name -->
		<a
			href="/"
			onclick={closeMenu}
			class="group flex items-center gap-2 text-ink dark:text-dark-text font-serif text-2xl tracking-tight hover:text-accent dark:hover:text-accent-dark transition-colors py-2"
		>
			<span class="w-2.5 h-2.5 rounded-full bg-accent dark:bg-accent-dark inline-block transition-transform duration-300 group-hover:scale-125"></span>
			<span class="font-normal">Studio</span>
			<span class="text-xs uppercase tracking-widest font-sans px-2 py-0.5 rounded border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted ml-0.5">
				Folio
			</span>
		</a>

		<!-- Right Header Actions -->
		<div class="flex items-center gap-2 sm:gap-6">
			<!-- Desktop Navigation Links -->
			<nav class="hidden md:flex items-center gap-1 sm:gap-2" aria-label="Main Navigation Desktop">
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

			<div class="hidden md:block w-px h-5 bg-light-border dark:bg-dark-border"></div>

			<!-- Theme Toggle Button (Always visible on mobile & desktop) -->
			<ThemeToggle />

			<!-- Mobile Hamburger Toggle Button (min 44x44px touch target) -->
			<button
				type="button"
				onclick={toggleMenu}
				aria-label={isMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
				aria-expanded={isMenuOpen}
				class="md:hidden relative flex flex-col items-center justify-center w-11 h-11 rounded-full border border-light-border dark:border-dark-border bg-light-surface/80 dark:bg-dark-surface/80 text-ink dark:text-dark-text hover:border-accent dark:hover:border-accent-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
			>
				<span class="sr-only">Toggle Menu</span>
				<!-- Minimalist 2-line Morphing Hamburger Icon -->
				<span
					class="w-5 h-[1.5px] bg-ink dark:bg-dark-text transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] {isMenuOpen
						? 'rotate-45 translate-y-[3.5px]'
						: '-translate-y-1'}"
				></span>
				<span
					class="w-5 h-[1.5px] bg-ink dark:bg-dark-text transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] {isMenuOpen
						? '-rotate-45 -translate-y-[3.5px]'
						: 'translate-y-1'}"
				></span>
			</button>
		</div>
	</div>
</header>

<!-- Minimalist Full-Screen Mobile Menu Overlay (OUTSIDE <header> to prevent containing block trap) -->
{#if isMenuOpen}
	<div
		transition:fade={{ duration: 180 }}
		class="fixed inset-0 top-16 z-40 md:hidden flex flex-col justify-between p-6 sm:p-8 bg-paper/98 dark:bg-dark-bg/98 backdrop-blur-2xl overflow-y-auto border-t border-light-border dark:border-dark-border"
		style="height: calc(100dvh - 4rem);"
	>
		<!-- Editorial Navigation Links -->
		<nav class="flex flex-col space-y-2 pt-2" aria-label="Main Navigation Mobile">
			{#each navItems as item}
				<a
					href={item.href}
					onclick={closeMenu}
					class="group flex items-center justify-between py-4 border-b border-light-border/60 dark:border-dark-border/60 text-ink dark:text-dark-text transition-colors duration-150 min-h-[56px] {isActive(
						item.href
					)
						? 'text-accent dark:text-accent-dark font-medium'
						: 'hover:text-accent dark:hover:text-accent-dark'}"
					aria-current={isActive(item.href) ? 'page' : undefined}
				>
					<div class="flex items-baseline gap-4">
						<span class="font-mono text-xs text-light-muted dark:text-dark-muted tracking-widest">
							{item.num}
						</span>
						<span class="font-serif text-3xl sm:text-4xl tracking-tight">
							{item.name}
						</span>
					</div>

					{#if isActive(item.href)}
						<span class="w-2.5 h-2.5 rounded-full bg-accent dark:bg-accent-dark"></span>
					{:else}
						<span class="text-sm text-light-muted dark:text-dark-muted transition-transform duration-200 group-hover:translate-x-1">
							→
						</span>
					{/if}
				</a>
			{/each}
		</nav>

		<!-- Bottom Status & Quick Contact Area in Mobile Menu -->
		<div class="pt-6 space-y-4 border-t border-light-border dark:border-dark-border">
			<div class="flex items-center gap-2 text-xs font-medium text-accent dark:text-accent-dark">
				<span class="w-2 h-2 rounded-full bg-accent dark:bg-accent-dark animate-pulse"></span>
				<span>Tersedia untuk kolaborasi &amp; proyek terpilih</span>
			</div>

			<div class="flex items-center justify-between gap-4">
				<a
					href="mailto:contact@domain.com"
					onclick={closeMenu}
					class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-white hover:bg-accent-hover font-medium text-sm transition-colors min-h-[46px]"
				>
					<span>Hubungi via Email</span>
					<span>↗</span>
				</a>
			</div>
		</div>
	</div>
{/if}


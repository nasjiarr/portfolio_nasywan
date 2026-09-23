<script>
	let { data } = $props();
	const Content = $derived(data.component);
</script>

<svelte:head>
	<title>{data.metadata.title} — Studio Folio</title>
	<meta name="description" content={data.metadata.description} />
	<meta property="og:title" content="{data.metadata.title} — Studio Folio" />
	<meta property="og:description" content={data.metadata.description} />
	<meta property="og:image" content={data.metadata.image} />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{data.metadata.title} — Studio Folio" />
	<meta name="twitter:description" content={data.metadata.description} />
	<meta name="twitter:image" content={data.metadata.image} />
</svelte:head>

<article class="max-w-4xl mx-auto space-y-12">
	<!-- Back Navigation Link -->
	<div>
		<a
			href="/projects/"
			class="group inline-flex items-center gap-2 text-sm text-light-muted dark:text-dark-muted hover:text-accent dark:hover:text-accent-dark transition-colors duration-150"
		>
			<span class="transition-transform duration-150 group-hover:-translate-x-1">←</span>
			<span>Kembali ke Semua Proyek</span>
		</a>
	</div>

	<!-- Project Header -->
	<header class="space-y-6">
		<div class="flex flex-wrap items-center gap-3 text-xs tracking-wider uppercase text-light-muted dark:text-dark-muted">
			<span class="px-2.5 py-1 rounded border border-light-border dark:border-dark-border bg-light-surface/60 dark:bg-dark-surface/60 font-medium text-accent dark:text-accent-dark">
				{data.metadata.category}
			</span>
			<span>•</span>
			<span>{data.metadata.year}</span>
		</div>

		<h1 class="font-serif text-4xl sm:text-6xl font-normal text-ink dark:text-dark-text tracking-tight leading-[1.08]">
			{data.metadata.title}
		</h1>

		<p class="font-sans text-lg sm:text-xl text-light-muted dark:text-dark-muted font-light leading-relaxed max-w-3xl">
			{data.metadata.description}
		</p>
	</header>

	<!-- Hairline Divider -->
	<div class="w-full h-px bg-light-border dark:bg-dark-border"></div>

	<!-- Project Metadata Matrix (Hairline Grid) -->
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-2xl border border-light-border dark:border-dark-border bg-light-surface/40 dark:bg-dark-surface/40">
		<div class="space-y-1">
			<p class="text-xs uppercase tracking-widest text-light-muted dark:text-dark-muted">Klien</p>
			<p class="font-medium text-sm text-ink dark:text-dark-text">{data.metadata.client || 'Internal Project'}</p>
		</div>

		<div class="space-y-1">
			<p class="text-xs uppercase tracking-widest text-light-muted dark:text-dark-muted">Peran</p>
			<p class="font-medium text-sm text-ink dark:text-dark-text">{data.metadata.role || 'Design & Code'}</p>
		</div>

		<div class="space-y-1">
			<p class="text-xs uppercase tracking-widest text-light-muted dark:text-dark-muted">Timeline</p>
			<p class="font-medium text-sm text-ink dark:text-dark-text">{data.metadata.timeline || '2026'}</p>
		</div>

		<div class="space-y-1">
			<p class="text-xs uppercase tracking-widest text-light-muted dark:text-dark-muted">Demo & Repositori</p>
			<div class="flex items-center gap-3 pt-0.5">
				{#if data.metadata.demoUrl}
					<a
						href={data.metadata.demoUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="text-xs font-medium text-accent dark:text-accent-dark hover:underline flex items-center gap-1"
					>
						<span>Live Demo</span>
						<span>↗</span>
					</a>
				{/if}
				{#if data.metadata.repoUrl}
					<a
						href={data.metadata.repoUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="text-xs font-medium text-light-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-text hover:underline flex items-center gap-1"
					>
						<span>Source</span>
						<span>↗</span>
					</a>
				{/if}
			</div>
		</div>
	</div>

	<!-- Tech Stack Badges -->
	<div class="flex flex-wrap items-center gap-2">
		<span class="text-xs text-light-muted dark:text-dark-muted mr-2">Teknologi:</span>
		{#each data.metadata.tags as tag}
			<span class="px-3 py-1 rounded-full text-xs font-medium border border-light-border dark:border-dark-border bg-paper dark:bg-dark-bg text-ink/80 dark:text-dark-text/80">
				{tag}
			</span>
		{/each}
	</div>

	<!-- Hero Mockup Showcase -->
	<figure class="rounded-2xl border border-light-border dark:border-dark-border overflow-hidden bg-light-surface dark:bg-dark-surface p-2 sm:p-4 shadow-sm">
		<img
			src={data.metadata.image}
			alt="Pratinjau visual {data.metadata.title}"
			class="w-full h-auto rounded-xl object-cover"
			loading="eager"
		/>
	</figure>

	<!-- Hairline Divider -->
	<div class="w-full h-px bg-light-border dark:bg-dark-border"></div>

	<!-- Markdown Case Study Content -->
	<section class="prose-content max-w-none pt-2">
		{#if Content}
			<div class="space-y-6 text-ink/85 dark:text-dark-text/85 text-base sm:text-lg font-light leading-relaxed">
				<Content />
			</div>
		{/if}
	</section>

	<!-- Bottom Navigation & Action Bar -->
	<div class="pt-12 mt-12 border-t border-light-border dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-6">
		<a
			href="/projects/"
			class="inline-flex items-center gap-2 text-sm text-light-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-text"
		>
			<span>← Kembali ke Daftar Proyek</span>
		</a>

		<div class="flex items-center gap-3">
			{#if data.metadata.demoUrl}
				<a
					href={data.metadata.demoUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="px-5 py-2.5 rounded-lg bg-accent text-white hover:bg-accent-hover text-sm font-medium transition-colors"
				>
					Buka Demo ↗
				</a>
			{/if}
			<a
				href="/contact/"
				class="px-5 py-2.5 rounded-lg border border-light-border dark:border-dark-border hover:border-accent dark:hover:border-accent-dark text-sm font-medium transition-colors"
			>
				Diskusikan Proyek Serupa
			</a>
		</div>
	</div>
</article>

<style>
	/* Clean Typography Styling for Markdown content */
	:global(.prose-content h2) {
		font-family: var(--font-serif);
		font-size: 1.875rem;
		font-weight: 400;
		color: var(--color-ink);
		margin-top: 2.5rem;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--color-light-border);
		letter-spacing: -0.02em;
	}

	:global(html.dark .prose-content h2) {
		color: var(--color-dark-text);
		border-bottom-color: var(--color-dark-border);
	}

	:global(.prose-content h3) {
		font-family: var(--font-serif);
		font-size: 1.35rem;
		font-weight: 400;
		color: var(--color-ink);
		margin-top: 2rem;
		margin-bottom: 0.75rem;
	}

	:global(html.dark .prose-content h3) {
		color: var(--color-dark-text);
	}

	:global(.prose-content p) {
		margin-bottom: 1.25rem;
		line-height: 1.75;
	}

	:global(.prose-content ul) {
		list-style-type: none;
		padding-left: 0;
		margin-top: 1rem;
		margin-bottom: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}

	:global(.prose-content li) {
		position: relative;
		padding-left: 1.5rem;
		line-height: 1.6;
	}

	:global(.prose-content li::before) {
		content: "—";
		position: absolute;
		left: 0;
		color: var(--color-accent);
	}

	:global(html.dark .prose-content li::before) {
		color: var(--color-accent-dark);
	}

	:global(.prose-content strong) {
		font-weight: 600;
		color: var(--color-ink);
	}

	:global(html.dark .prose-content strong) {
		color: var(--color-dark-text);
	}

	:global(.prose-content hr) {
		border: 0;
		height: 1px;
		background-color: var(--color-light-border);
		margin: 2.5rem 0;
	}

	:global(html.dark .prose-content hr) {
		background-color: var(--color-dark-border);
	}
</style>

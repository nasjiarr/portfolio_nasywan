<svelte:head>
	<title>Home — Studio Folio</title>
	<meta name="description" content="Portfolio of design, creative engineering, and digital craft." />
</svelte:head>

<section class="max-w-3xl space-y-12">
	<!-- Hero Intro -->
	<div class="space-y-4">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-light-border dark:border-dark-border text-xs font-medium text-accent dark:text-accent-dark bg-accent-light/50 dark:bg-accent/15">
			<span class="w-1.5 h-1.5 rounded-full bg-accent dark:bg-accent-dark animate-pulse"></span>
			<span>Available for select projects</span>
		</div>

		<h1 class="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-ink dark:text-dark-text leading-[1.08]">
			Designing thoughtful digital experiences with craft &amp; purpose.
		</h1>

		<p class="font-sans text-lg sm:text-xl text-light-muted dark:text-dark-muted font-light leading-relaxed max-w-2xl pt-2">
			Selamat datang di ruang portofolio saya. Di sini Anda akan menemukan kurasi karya desain antarmuka, rekayasa perangkat lunak, dan eksplorasi tipografi modern.
		</p>
	</div>

	<!-- Action Links -->
	<div class="flex flex-wrap items-center gap-4 pt-2">
		<a
			href="/projects/"
			class="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-white hover:bg-accent-hover font-medium text-sm transition-colors duration-150 shadow-sm"
		>
			Lihat Proyek
		</a>
		<a
			href="/about/"
			class="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-light-border dark:border-dark-border bg-light-surface/60 dark:bg-dark-surface/60 text-ink dark:text-dark-text hover:border-accent dark:hover:border-accent-dark font-medium text-sm transition-colors duration-150"
		>
			Tentang Saya
		</a>
	</div>

	<!-- Foundation Status Card -->
	<div class="pt-8 border-t border-light-border dark:border-dark-border">
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
			<div class="p-5 rounded-xl border border-light-border dark:border-dark-border bg-light-surface/40 dark:bg-dark-surface/40">
				<p class="text-xs uppercase tracking-widest text-light-muted dark:text-dark-muted mb-1">Framework</p>
				<p class="font-semibold text-base text-ink dark:text-dark-text">SvelteKit 2</p>
				<p class="text-xs text-light-muted dark:text-dark-muted mt-1">Svelte 5 runes &amp; SSG static adapter</p>
			</div>
			<div class="p-5 rounded-xl border border-light-border dark:border-dark-border bg-light-surface/40 dark:bg-dark-surface/40">
				<p class="text-xs uppercase tracking-widest text-light-muted dark:text-dark-muted mb-1">Styling</p>
				<p class="font-semibold text-base text-ink dark:text-dark-text">Tailwind CSS</p>
				<p class="text-xs text-light-muted dark:text-dark-muted mt-1">Custom warm palette &amp; class strategy</p>
			</div>
			<div class="p-5 rounded-xl border border-light-border dark:border-dark-border bg-light-surface/40 dark:bg-dark-surface/40">
				<p class="text-xs uppercase tracking-widest text-light-muted dark:text-dark-muted mb-1">Typography</p>
				<p class="font-semibold text-base text-ink dark:text-dark-text">Instrument &amp; Geist</p>
				<p class="text-xs text-light-muted dark:text-dark-muted mt-1">Editorial serif + crisp sans-serif</p>
			</div>
		</div>
	</div>
</section>

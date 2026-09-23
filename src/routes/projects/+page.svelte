<svelte:head>
	<title>Projects — Studio Folio</title>
	<meta name="description" content="Selected projects, case studies, and digital experiments." />
</svelte:head>

<section class="max-w-4xl space-y-10">
	<div class="space-y-3">
		<p class="text-xs uppercase tracking-widest text-accent dark:text-accent-dark font-medium">Portofolio</p>
		<h1 class="font-serif text-4xl sm:text-5xl font-normal text-ink dark:text-dark-text tracking-tight">
			Proyek Terpilih
		</h1>
		<p class="font-sans text-base sm:text-lg text-light-muted dark:text-dark-muted max-w-2xl font-light">
			Koleksi karya eksplorasi desain web, aplikasi interaktif, dan sistem desain yang mengedepankan kualitas visual serta performa tinggi.
		</p>
	</div>

	<!-- Project List Placeholder / Foundation Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
		{#each [
			{
				title: 'Editorial Design System',
				category: 'Design Engineering',
				desc: 'Sistem desain modular berfokus pada ritme tipografi dan estetika editorial kontemporer.',
				year: '2026'
			},
			{
				title: 'Fintech Dashboard Interface',
				category: 'Product Design',
				desc: 'Eksplorasi visual data keuangan yang intuitif dengan integrasi visualisasi data interaktif.',
				year: '2025'
			},
			{
				title: 'E-Commerce Minimalis',
				category: 'Fullstack Web',
				desc: 'Pengalaman belanja daring yang tenang, cepat, dan tanpa friksi navigasi.',
				year: '2025'
			},
			{
				title: 'Creative Agency Showcase',
				category: 'Interactive Web',
				desc: 'Website representatif studio kreatif dengan transisi halaman halus dan performa 100 lighthouse.',
				year: '2024'
			}
		] as project}
			<article class="group p-6 rounded-2xl border border-light-border dark:border-dark-border bg-light-surface/50 dark:bg-dark-surface/50 hover:border-accent/40 dark:hover:border-accent-dark/40 transition-all duration-200 flex flex-col justify-between">
				<div class="space-y-3">
					<div class="flex items-center justify-between text-xs text-light-muted dark:text-dark-muted">
						<span>{project.category}</span>
						<span>{project.year}</span>
					</div>
					<h2 class="font-serif text-2xl font-normal text-ink dark:text-dark-text group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
						{project.title}
					</h2>
					<p class="text-sm text-light-muted dark:text-dark-muted font-light leading-relaxed">
						{project.desc}
					</p>
				</div>
				<div class="pt-6 mt-4 border-t border-light-border/60 dark:border-dark-border/60 flex items-center justify-between">
					<span class="text-xs font-medium text-accent dark:text-accent-dark group-hover:underline">Detail proyek →</span>
				</div>
			</article>
		{/each}
	</div>
</section>

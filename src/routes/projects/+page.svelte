<script>
	import { reveal, curtainReveal } from '$lib/animations';

	let { data } = $props();
</script>

<svelte:head>
	<title>Projects — Studio Folio</title>
	<meta name="description" content="Arsip kurasi karya desain sistem, web application, dan eksplorasi antarmuka digital." />
	<meta property="og:title" content="Projects — Studio Folio" />
	<meta property="og:description" content="Arsip kurasi karya desain sistem, web application, dan eksplorasi antarmuka digital." />
	<meta property="og:type" content="website" />
</svelte:head>

<section class="max-w-5xl mx-auto space-y-12">
	<!-- Page Header with Curtain Reveal -->
	<header class="space-y-4 max-w-3xl">
		<div class="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent dark:text-accent-dark font-medium">
			<span>Koleksi Karya</span>
			<span>•</span>
			<span>{data.projects.length} Proyek Terpublikasi</span>
		</div>

		<h1 use:curtainReveal class="font-serif text-4xl sm:text-6xl font-normal text-ink dark:text-dark-text tracking-tight leading-[1.08]">
			Daftar Proyek &amp; Eksplorasi
		</h1>

		<p class="font-sans text-base sm:text-lg text-light-muted dark:text-dark-muted font-light leading-relaxed">
			Koleksi terpilih mencakup desain sistem, platform data analitik, dan aplikasi web performa tinggi yang dibangun dengan perhatian mendalam terhadap detail tipografi dan arsitektur kode.
		</p>
	</header>

	<!-- Hairline Divider -->
	<div class="w-full h-px bg-light-border dark:bg-dark-border"></div>

	<!-- Projects Grid with Stagger Delay, Hover Zoom, and Custom Cursor Hook -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
		{#each data.projects as project, index}
			<div use:reveal={{ delay: index * 100, y: 24 }}>
				<a
					href="/projects/{project.slug}/"
					data-cursor="view"
					class="group flex flex-col justify-between h-full rounded-2xl border border-light-border dark:border-dark-border bg-light-surface/40 dark:bg-dark-surface/40 hover:border-accent/40 dark:hover:border-accent-dark/40 overflow-hidden transition-all duration-200"
				>
					<!-- Visual Mockup Container with Smooth Zoom & Gradient Overlay -->
					<div class="p-4 sm:p-5 border-b border-light-border dark:border-dark-border bg-light-surface/80 dark:bg-dark-surface/80">
						<div class="overflow-hidden rounded-xl bg-paper dark:bg-dark-bg aspect-[16/10] relative">
							<img
								src={project.image}
								alt={project.title}
								class="card-zoom-img w-full h-full object-cover"
								loading="lazy"
							/>
							<!-- Subtle gradient overlay on hover -->
							<div class="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
						</div>
					</div>

					<!-- Content Details -->
					<div class="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
						<div class="space-y-3">
							<div class="flex items-center justify-between text-xs text-light-muted dark:text-dark-muted">
								<span class="font-medium text-accent dark:text-accent-dark">{project.category}</span>
								<span>{project.year}</span>
							</div>

							<h2 class="font-serif text-2xl sm:text-3xl font-normal text-ink dark:text-dark-text group-hover:text-accent dark:group-hover:text-accent-dark transition-colors duration-150">
								{project.title}
							</h2>

							<p class="font-sans text-sm sm:text-base text-light-muted dark:text-dark-muted font-light leading-relaxed">
								{project.description}
							</p>
						</div>

						<div class="space-y-4 pt-4 border-t border-light-border/60 dark:border-dark-border/60">
							<!-- Tags -->
							<div class="flex flex-wrap gap-1.5">
								{#each project.tags.slice(0, 3) as tag}
									<span class="px-2.5 py-0.5 rounded text-[11px] font-medium border border-light-border/70 dark:border-dark-border/70 bg-paper dark:bg-dark-bg text-light-muted dark:text-dark-muted">
										{tag}
									</span>
								{/each}
							</div>

							<!-- Action CTA -->
							<div class="flex items-center justify-between pt-1">
								<span class="text-xs font-medium text-accent dark:text-accent-dark group-hover:underline flex items-center gap-1">
									<span>Lihat studi kasus</span>
									<span class="transition-transform duration-150 group-hover:translate-x-1">→</span>
								</span>
								<span class="text-xs text-light-muted dark:text-dark-muted font-mono">0{index + 1}</span>
							</div>
						</div>
					</div>
				</a>
			</div>
		{/each}
	</div>
</section>

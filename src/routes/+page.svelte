<script>
	import { reveal, magnetic, curtainReveal, wordReveal } from '$lib/animations';
	import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
	import CursorGlow from '$lib/components/CursorGlow.svelte';
	import KineticTypography from '$lib/components/KineticTypography.svelte';

	let { data } = $props();

	// Daftar kata/role untuk kinetic typography di hero section (dapat disesuaikan)
	const heroRoles = [
		'Software Engineer',
		'Web Developer',
		'Fullstack Developer',
		'Laravel Specialist'
	];
</script>

<svelte:head>
	<title>nasywandev — Software Engineering Portfolio</title>
	<meta name="description" content="Portofolio Nasywan Jibran Aryadi — software engineering, desain sistem, dan pengembangan aplikasi web modern." />
	<meta property="og:title" content="nasywandev — Software Engineering Portfolio" />
	<meta property="og:description" content="Portofolio Nasywan Jibran Aryadi — software engineering, desain sistem, dan pengembangan aplikasi web modern." />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="space-y-12 sm:space-y-20 lg:space-y-28">
	<!-- Hero Section with Scroll Reveal & Cursor Glow -->
	<section use:reveal={{ delay: 0, y: 14 }} class="relative max-w-4xl space-y-6 sm:space-y-8 pt-2 sm:pt-6">
		<!-- Cursor-Following Radial Glow (Disabled on touch devices & reduced motion) -->
		<CursorGlow />

		<!-- Status Indicator -->
		<div class="relative z-10 inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-light-border dark:border-dark-border text-xs font-medium text-accent dark:text-accent-dark bg-accent-light/40 dark:bg-accent/15">
			<span class="w-1.5 h-1.5 rounded-full bg-accent dark:bg-accent-dark animate-pulse"></span>
			<span>Tersedia untuk proyek terpilih &amp; kolaborasi</span>
		</div>

		<!-- Main Hero Headline with Per-word Blur-to-Focus Reveal -->
		<div class="relative z-10 space-y-4 sm:space-y-6">
			<h1
				use:wordReveal={{ delay: 0.1, duration: 0.8 }}
				class="font-serif text-3xl sm:text-5xl lg:text-7xl font-normal tracking-tight text-ink dark:text-dark-text leading-[1.12] sm:leading-[1.06]"
			>
				Membangun solusi digital yang terstruktur, andal, dan siap berkembang.
			</h1>

			<p class="font-sans text-base sm:text-xl lg:text-2xl text-light-muted dark:text-dark-muted font-light leading-relaxed max-w-2xl">
				Saya seorang <KineticTypography words={heroRoles} interval={2400} /> yang berfokus pada arsitektur aplikasi yang terstruktur, kode yang andal, dan sistem web siap berkembang.
			</p>
		</div>

		<!-- Action Links with Magnetic Button Effect & Mobile-friendly Touch Targets -->
		<div class="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
			<a
				use:magnetic={{ strength: 0.3 }}
				href="/projects/"
				class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-white hover:bg-accent-hover active:scale-[0.985] font-medium text-sm transition-all duration-150 shadow-sm min-h-[46px]"
			>
				<span>Eksplorasi Proyek</span>
				<span>→</span>
			</a>
			<a
				use:magnetic={{ strength: 0.22 }}
				href="/about/"
				class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-light-border dark:border-dark-border bg-light-surface/60 dark:bg-dark-surface/60 text-ink dark:text-dark-text hover:border-accent dark:hover:border-accent-dark active:scale-[0.985] font-medium text-sm transition-all duration-150 min-h-[46px]"
			>
				<span>Tentang Saya</span>
			</a>
			<a
				use:magnetic={{ strength: 0.22 }}
				href="/contact/"
				class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-light-border dark:border-dark-border bg-light-surface/60 dark:bg-dark-surface/60 text-light-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-text hover:border-accent dark:hover:border-accent-dark active:scale-[0.985] font-medium text-sm transition-all duration-150 min-h-[46px]"
			>
				<span>Hubungi Langsung</span>
			</a>
		</div>
	</section>

	<!-- Hairline Divider -->
	<div class="w-full h-px bg-light-border dark:bg-dark-border"></div>

	<!-- Featured Projects Section with Staggered Scroll Reveal -->
	<section class="space-y-8 sm:space-y-10">
		<div use:reveal={{ delay: 40, y: 14 }} class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
			<div class="space-y-1.5 sm:space-y-2">
				<p class="text-xs uppercase tracking-widest text-accent dark:text-accent-dark font-medium">Karya Terpilih</p>
				<!-- Section Heading with Curtain Clip-Path Reveal -->
				<h2
					use:curtainReveal
					class="font-serif text-2xl sm:text-4xl font-normal text-ink dark:text-dark-text tracking-tight"
				>
					Proyek Unggulan
				</h2>
			</div>

			<a
				href="/projects/"
				class="group inline-flex items-center gap-1.5 text-sm font-medium text-accent dark:text-accent-dark hover:underline py-1"
			>
				<span>Lihat seluruh arsip ({data.featuredProjects.length})</span>
				<span class="transition-transform duration-150 group-hover:translate-x-1">→</span>
			</a>
		</div>

		<!-- Featured Grid with Stagger Delay, Hover Zoom & Touch Feedback -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
			{#each data.featuredProjects as project, index}
				<div use:reveal={{ delay: index * 100, y: 16 }}>
					<a
						href="/projects/{project.slug}/"
						data-cursor="view"
						class="touch-card group flex flex-col justify-between h-full rounded-2xl border border-light-border dark:border-dark-border bg-light-surface/40 dark:bg-dark-surface/40 hover:border-accent/40 dark:hover:border-accent-dark/40 active:border-accent/50 overflow-hidden transition-all duration-200"
					>
						<!-- Mockup Header with Smooth Zoom & Gradient Overlay -->
						<div class="p-3.5 sm:p-4 border-b border-light-border dark:border-dark-border bg-light-surface/70 dark:bg-dark-surface/70">
							<div class="overflow-hidden rounded-xl bg-paper dark:bg-dark-bg aspect-[16/11] relative">
								<ResponsiveImage
									src={project.image}
									alt={project.title}
									class="card-zoom-img w-full h-full object-cover"
									loading="lazy"
									decoding="async"
									width={800}
									height={550}
									sizes="(max-width: 768px) 100vw, 33vw"
									viewTransitionName="project-image-{project.slug}"
								/>
								<!-- Subtle dark gradient overlay appearing smoothly on hover -->
								<div class="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
							</div>
						</div>

						<!-- Details with Mobile-optimized Spacing -->
						<div class="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
							<div class="space-y-2">
								<div class="flex items-center justify-between text-xs text-light-muted dark:text-dark-muted">
									<span class="font-medium text-accent dark:text-accent-dark">{project.category}</span>
									<span>{project.year}</span>
								</div>

								<h3 class="font-serif text-xl sm:text-2xl font-normal text-ink dark:text-dark-text group-hover:text-accent dark:group-hover:text-accent-dark transition-colors duration-150">
									{project.title}
								</h3>

								<p class="font-sans text-xs sm:text-sm text-light-muted dark:text-dark-muted font-light leading-relaxed line-clamp-3">
									{project.description}
								</p>
							</div>

							<div class="pt-4 border-t border-light-border/60 dark:border-dark-border/60 flex items-center justify-between">
								<span class="text-xs font-medium text-accent dark:text-accent-dark group-hover:underline flex items-center gap-1 py-1">
									<span>Buka detail</span>
									<span class="transition-transform duration-150 group-hover:translate-x-1">→</span>
								</span>
								<span class="text-xs text-light-muted dark:text-dark-muted font-mono">0{index + 1}</span>
							</div>
						</div>
					</a>
				</div>
			{/each}
		</div>
	</section>

	<!-- Hairline Divider -->
	<div class="w-full h-px bg-light-border dark:bg-dark-border"></div>

	<!-- Quick Links & Philosophy Section with Mobile Proportional Padding -->
	<section use:reveal={{ delay: 60, y: 16 }} class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10 md:p-12 rounded-3xl border border-light-border dark:border-dark-border bg-light-surface/30 dark:bg-dark-surface/30">
		<div class="space-y-4">
			<p class="text-xs uppercase tracking-widest text-accent dark:text-accent-dark font-medium">Filosofi</p>
			<h2 use:curtainReveal class="font-serif text-2xl sm:text-3xl font-normal text-ink dark:text-dark-text">
				Kejelasan di atas kerumitan visual.
			</h2>
			<p class="font-sans text-sm sm:text-base text-light-muted dark:text-dark-muted font-light leading-relaxed">
				Setiap piksel dan baris kode dibangun dengan tujuan yang jelas. Tanpa animasi berlebihan yang mengganggu keterbacaan, setiap tata letak dirancang untuk memberikan pengalaman yang mulus dan abadi.
			</p>
			<div class="pt-2">
				<a
					href="/about/"
					class="text-sm font-medium text-accent dark:text-accent-dark hover:underline flex items-center gap-1.5 py-1"
				>
					<span>Pelajari pendekatan &amp; latar belakang saya</span>
					<span>→</span>
				</a>
			</div>
		</div>

		<div class="space-y-4 md:border-l md:border-light-border dark:md:border-dark-border md:pl-8 flex flex-col justify-between">
			<div class="space-y-3">
				<p class="text-xs uppercase tracking-widest text-light-muted dark:text-dark-muted font-medium">Memulai Kolaborasi</p>
				<h3 class="font-serif text-xl sm:text-2xl font-normal text-ink dark:text-dark-text">
					Punya ide atau proyek yang ingin direalisasikan?
				</h3>
				<p class="font-sans text-sm text-light-muted dark:text-dark-muted font-light leading-relaxed">
					Terbuka untuk konsultasi desain antarmuka, perancangan sistem desain, atau pengembangan web statis berkinerja tinggi.
				</p>
			</div>

			<div class="pt-4">
				<a
					use:magnetic={{ strength: 0.3 }}
					href="/contact/"
					class="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-xl bg-accent text-white hover:bg-accent-hover active:scale-[0.985] font-medium text-sm transition-all shadow-sm min-h-[46px]"
				>
					Kirim Pesan Langsung ↗
				</a>
			</div>
		</div>
	</section>
</div>

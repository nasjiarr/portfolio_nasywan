<script>
	import { reveal, curtainReveal } from '$lib/animations';
</script>

<svelte:head>
	<title>About — nasywandev</title>
	<meta name="description" content="Tentang Nasywan Jibran Aryadi — latar belakang, filosofi pengembangan, keahlian teknis, dan riwayat pengalaman." />
	<meta property="og:title" content="About — nasywandev" />
	<meta property="og:description" content="Tentang Nasywan Jibran Aryadi — latar belakang, filosofi pengembangan, keahlian teknis, dan riwayat pengalaman." />
	<meta property="og:type" content="profile" />
</svelte:head>

<section class="max-w-4xl mx-auto space-y-10 sm:space-y-16">
	<!-- Page Header with Curtain Reveal -->
	<header class="space-y-3 sm:space-y-4 max-w-3xl">
		<p class="text-xs uppercase tracking-widest text-accent dark:text-accent-dark font-medium">Biografi &amp; Filosofi</p>
		<h1 use:curtainReveal class="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-ink dark:text-dark-text tracking-tight leading-[1.12] sm:leading-[1.08]">
			Memahami kebutuhan, lalu membangun solusinya.
		</h1>
	</header>

	<!-- Hairline Divider -->
	<div class="w-full h-px bg-light-border dark:bg-dark-border"></div>

	<!-- Narrative Bio Section -->
	<div class="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-12">
		<div use:reveal={{ delay: 40, y: 16 }} class="md:col-span-4 space-y-4">
			<div class="p-5 sm:p-6 rounded-2xl border border-light-border dark:border-dark-border bg-light-surface/40 dark:bg-dark-surface/40 space-y-4">
				<div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-accent/20 dark:border-accent-dark/20 overflow-hidden bg-light-surface/60 dark:bg-dark-surface/60 shadow-sm">
					<img src="/images/profile-800.webp" alt="Foto Nasywan Jibran Aryadi" class="w-full h-full object-cover" width="128" height="128" loading="eager" decoding="async" />
				</div>
					<div>
					<p class="font-serif text-xl text-ink dark:text-dark-text">Nasywan Jibran Aryadi</p>
					<p class="text-xs text-light-muted dark:text-dark-muted font-sans mt-0.5">Software Engineering</p>
					</div>
					<div class="pt-3 border-t border-light-border dark:border-dark-border text-xs text-light-muted dark:text-dark-muted space-y-1.5">
					<p class="flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-accent dark:bg-accent-dark"></span>
						<span>Berbasis di Kulon Progo, DI Yogyakarta (UTC+7)</span>
					</p>
					<p>Bahasa: Indonesia (fasih), Inggris (intermediate)</p>
					</div>
			</div>

			<!-- Quick Social Links Column with Touch-friendly Targets -->
			<div class="p-5 rounded-2xl border border-light-border dark:border-dark-border bg-light-surface/20 dark:bg-dark-surface/20 space-y-1">
				<p class="text-xs uppercase tracking-wider text-light-muted dark:text-dark-muted font-medium mb-2">Tautan Terhubung</p>
				<div class="space-y-0.5 text-sm">
					<a
						href="https://github.com/nasjiarr"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center justify-between text-ink dark:text-dark-text hover:text-accent dark:hover:text-accent-dark py-2.5 px-1 group min-h-[44px]"
					>
						<span>GitHub</span>
						<span class="text-xs text-light-muted dark:text-dark-muted group-hover:translate-x-0.5 transition-transform">↗</span>
					</a>
					<a
						href="https://www.linkedin.com/in/nasywan-jibran-aryadi-7547a8214/"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center justify-between text-ink dark:text-dark-text hover:text-accent dark:hover:text-accent-dark py-2.5 px-1 group min-h-[44px]"
					>
						<span>LinkedIn</span>
						<span class="text-xs text-light-muted dark:text-dark-muted group-hover:translate-x-0.5 transition-transform">↗</span>
					</a>
					<a
						href="mailto:nasywanji@gmail.com"
						class="flex items-center justify-between text-ink dark:text-dark-text hover:text-accent dark:hover:text-accent-dark py-2.5 px-1 group min-h-[44px]"
					>
						<span>Surat Elektronik</span>
						<span class="text-xs text-light-muted dark:text-dark-muted group-hover:translate-x-0.5 transition-transform">↗</span>
					</a>
				</div>
			</div>
		</div>

		<!-- Story & Philosophy Content with Scroll Reveal -->
		<div use:reveal={{ delay: 80, y: 16 }} class="md:col-span-8 space-y-5 sm:space-y-6 text-ink/85 dark:text-dark-text/85 text-base sm:text-lg font-light leading-relaxed">
			<p>
				Saya merupakan lulusan S1 Sistem Informasi yang memiliki minat pada pengembangan website dan teknologi informasi. Saya mempelajari pengembangan web secara full stack menggunakan Laravel, PHP, MySQL, Blade, Tailwind CSS, dan JavaScript, serta memiliki pemahaman dasar mengenai jaringan komputer.
			</p>
			<p>
				Dalam bekerja, saya terbiasa memahami kebutuhan terlebih dahulu, mengembangkan solusi secara bertahap, dan memastikan hasilnya dapat digunakan dengan baik. Saya mampu bekerja secara mandiri maupun dalam tim serta memiliki semangat untuk terus belajar dan mengembangkan kemampuan di bidang teknologi.
			</p>
		</div>
	</div>

	<!-- Hairline Divider -->
	<div class="w-full h-px bg-light-border dark:bg-dark-border"></div>

	<!-- Skills & Capabilities Matrix (Staggered Scroll Reveal) -->
	<div class="space-y-5 sm:space-y-6">
		<div use:reveal={{ delay: 0, y: 14 }} class="space-y-1">
			<p class="text-xs uppercase tracking-widest text-accent dark:text-accent-dark font-medium">Kompetensi</p>
			<h2 class="font-serif text-2xl sm:text-3xl font-normal text-ink dark:text-dark-text">Keahlian &amp; Disiplin</h2>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
			<!-- Column 1 -->
			<div use:reveal={{ delay: 0, y: 16 }} class="p-5 sm:p-6 rounded-2xl border border-light-border dark:border-dark-border bg-light-surface/30 dark:bg-dark-surface/30 space-y-3">
				<h3 class="font-serif text-lg sm:text-xl font-normal text-ink dark:text-dark-text">Backend Development</h3>
				<ul class="space-y-2 text-sm text-light-muted dark:text-dark-muted font-light">
					<li>— Laravel &amp; PHP</li>
					<li>— MySQL &amp; MariaDB</li>
					<li>— Eloquent ORM &amp; Migrations</li>
					<li>— REST API &amp; Role-Based Access</li>
				</ul>
			</div>

			<!-- Column 2 -->
			<div use:reveal={{ delay: 60, y: 16 }} class="p-5 sm:p-6 rounded-2xl border border-light-border dark:border-dark-border bg-light-surface/30 dark:bg-dark-surface/30 space-y-3">
				<h3 class="font-serif text-lg sm:text-xl font-normal text-ink dark:text-dark-text">Frontend Development</h3>
				<ul class="space-y-2 text-sm text-light-muted dark:text-dark-muted font-light">
					<li>— Blade &amp; Inertia.js</li>
					<li>— Vue 3 &amp; JavaScript</li>
					<li>— Tailwind CSS</li>
					<li>— Responsive &amp; Mobile-First Layouts</li>
				</ul>
			</div>

			<!-- Column 3 -->
			<div use:reveal={{ delay: 120, y: 16 }} class="p-5 sm:p-6 rounded-2xl border border-light-border dark:border-dark-border bg-light-surface/30 dark:bg-dark-surface/30 space-y-3">
				<h3 class="font-serif text-lg sm:text-xl font-normal text-ink dark:text-dark-text">Tools &amp; Practices</h3>
				<ul class="space-y-2 text-sm text-light-muted dark:text-dark-muted font-light">
					<li>— Git &amp; GitHub</li>
					<li>— Docker &amp; Laragon</li>
					<li>— Automated Testing (Pest/PHPUnit)</li>
					<li>— Dasar Jaringan Komputer</li>
				</ul>
			</div>
		</div>
	</div>

	<!-- Hairline Divider -->
	<div class="w-full h-px bg-light-border dark:bg-dark-border"></div>

	<!-- Experience Timeline (Hairline Rows with Staggered Scroll Reveal) -->
	<div class="space-y-5 sm:space-y-6">
		<div use:reveal={{ delay: 0, y: 14 }} class="space-y-1">
			<p class="text-xs uppercase tracking-widest text-accent dark:text-accent-dark font-medium">Pengalaman</p>
			<h2 class="font-serif text-2xl sm:text-3xl font-normal text-ink dark:text-dark-text">Riwayat Magang</h2>
		</div>

		<div class="divide-y divide-light-border dark:divide-dark-border border-y border-light-border dark:border-dark-border">
			{#each [
				{
					period: 'Jan — Feb 2025',
					role: 'Staff IT',
					company: 'PT. BPR Bank Kulon Progo',
					desc: 'Magang sebagai Staff Teknologi Informasi. Mengembangkan website manajemen arsip berkas untuk mendukung digitalisasi dan pengelolaan arsip, serta melakukan pemeliharaan dan perbaikan perangkat TI termasuk printer dan perangkat keras lainnya.'
				}
			] as exp, index}
				<div use:reveal={{ delay: index * 80, y: 14 }} class="py-5 sm:py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
					<div class="sm:col-span-3 text-xs uppercase tracking-widest font-mono text-light-muted dark:text-dark-muted">
						{exp.period}
					</div>
					<div class="sm:col-span-4 space-y-0.5">
						<p class="font-medium text-base text-ink dark:text-dark-text">{exp.role}</p>
						<p class="text-xs text-accent dark:text-accent-dark">{exp.company}</p>
					</div>
					<div class="sm:col-span-5 text-sm text-light-muted dark:text-dark-muted font-light leading-relaxed">
						{exp.desc}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Hairline Divider -->
	<div class="w-full h-px bg-light-border dark:bg-dark-border"></div>

	<!-- Education Timeline -->
	<div class="space-y-5 sm:space-y-6">
		<div use:reveal={{ delay: 0, y: 14 }} class="space-y-1">
			<p class="text-xs uppercase tracking-widest text-accent dark:text-accent-dark font-medium">Pendidikan</p>
			<h2 class="font-serif text-2xl sm:text-3xl font-normal text-ink dark:text-dark-text">Riwayat Pendidikan</h2>
		</div>

		<div class="divide-y divide-light-border dark:divide-dark-border border-y border-light-border dark:border-dark-border">
			<div use:reveal={{ delay: 0, y: 14 }} class="py-5 sm:py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
				<div class="sm:col-span-3 text-xs uppercase tracking-widest font-mono text-light-muted dark:text-dark-muted">
					2022 — 2026
				</div>
				<div class="sm:col-span-4 space-y-0.5">
					<p class="font-medium text-base text-ink dark:text-dark-text">S1 Sistem Informasi</p>
					<p class="text-xs text-accent dark:text-accent-dark">Universitas Pembangunan Nasional "Veteran" Yogyakarta</p>
				</div>
				<div class="sm:col-span-5 text-sm text-light-muted dark:text-dark-muted font-light leading-relaxed">
					<span class="font-mono">IPK 3.56 / 4.00</span> — Berfokus pada pengembangan web, manajemen data, dan penerapan teknologi informasi dalam organisasi.
				</div>
			</div>
		</div>
	</div>
</section>

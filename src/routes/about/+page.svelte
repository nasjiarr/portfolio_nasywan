<svelte:head>
	<title>About — Studio Folio</title>
	<meta name="description" content="About my background, design philosophy, and technical stack." />
</svelte:head>

<section class="max-w-3xl space-y-10">
	<div class="space-y-3">
		<p class="text-xs uppercase tracking-widest text-accent dark:text-accent-dark font-medium">Profil</p>
		<h1 class="font-serif text-4xl sm:text-5xl font-normal text-ink dark:text-dark-text tracking-tight">
			Tentang Saya
		</h1>
	</div>

	<div class="prose dark:prose-invert space-y-6 text-ink/80 dark:text-dark-text/80 text-base sm:text-lg font-light leading-relaxed">
		<p>
			Saya adalah seorang perancang dan pengembang web yang percaya bahwa situs web terbaik lahir dari perpaduan antara tipografi yang kuat, ritme visual yang seimbang, dan arsitektur kode yang efisien.
		</p>
		<p>
			Fokus utama saya mencakup pembuatan antarmuka modern yang cepat diakses, mudah dinavigasi, dan memiliki identitas visual yang khas tanpa terasa bising atau berlebihan.
		</p>
	</div>

	<!-- Skills & Discipline -->
	<div class="pt-8 border-t border-light-border dark:border-dark-border grid grid-cols-1 sm:grid-cols-2 gap-8">
		<div class="space-y-3">
			<h2 class="font-serif text-xl font-normal text-ink dark:text-dark-text">Keahlian Utama</h2>
			<ul class="space-y-2 text-sm text-light-muted dark:text-dark-muted font-light">
				<li class="flex items-center gap-2">
					<span class="w-1.5 h-1.5 rounded-full bg-accent dark:bg-accent-dark"></span>
					UI/UX Design &amp; Prototyping
				</li>
				<li class="flex items-center gap-2">
					<span class="w-1.5 h-1.5 rounded-full bg-accent dark:bg-accent-dark"></span>
					Modern Frontend Architecture (SvelteKit, Next.js)
				</li>
				<li class="flex items-center gap-2">
					<span class="w-1.5 h-1.5 rounded-full bg-accent dark:bg-accent-dark"></span>
					Design Systems &amp; Component Libraries
				</li>
				<li class="flex items-center gap-2">
					<span class="w-1.5 h-1.5 rounded-full bg-accent dark:bg-accent-dark"></span>
					Web Performance &amp; Accessibility (a11y)
				</li>
			</ul>
		</div>

		<div class="space-y-3">
			<h2 class="font-serif text-xl font-normal text-ink dark:text-dark-text">Prinsip Kerja</h2>
			<ul class="space-y-2 text-sm text-light-muted dark:text-dark-muted font-light">
				<li class="flex items-center gap-2">
					<span class="w-1.5 h-1.5 rounded-full bg-gold dark:bg-gold-dark"></span>
					Tipografi sebagai fondasi utama hierarki
				</li>
				<li class="flex items-center gap-2">
					<span class="w-1.5 h-1.5 rounded-full bg-gold dark:bg-gold-dark"></span>
					Performa statis tanpa overhead runtime yang tidak perlu
				</li>
				<li class="flex items-center gap-2">
					<span class="w-1.5 h-1.5 rounded-full bg-gold dark:bg-gold-dark"></span>
					Aksesibilitas dan adaptasi kontras tema yang alami
				</li>
			</ul>
		</div>
	</div>
</section>

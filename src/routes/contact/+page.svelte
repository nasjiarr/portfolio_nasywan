<script>
	import { reveal, curtainReveal, magnetic } from '$lib/animations';

	let copied = $state(false);
	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');

	function copyEmail() {
		navigator.clipboard.writeText('contact@domain.com');
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}

	/** @param {SubmitEvent} e */
	function handleFormSubmit(e) {
		e.preventDefault();
		const mailtoSubject = encodeURIComponent(subject || `Pesan Portofolio dari ${name}`);
		const mailtoBody = encodeURIComponent(
			`Halo,\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${message}\n\nSalam,\n${name}`
		);
		window.location.href = `mailto:contact@domain.com?subject=${mailtoSubject}&body=${mailtoBody}`;
	}
</script>

<svelte:head>
	<title>Contact — Studio Folio</title>
	<meta name="description" content="Hubungi langsung untuk peluang proyek baru, konsultasi desain sistem, atau kolaborasi kreatif." />
	<meta property="og:title" content="Contact — Studio Folio" />
	<meta property="og:description" content="Hubungi langsung untuk peluang proyek baru, konsultasi desain sistem, atau kolaborasi kreatif." />
	<meta property="og:type" content="website" />
</svelte:head>

<section class="max-w-4xl mx-auto space-y-16">
	<!-- Page Header with Curtain Reveal -->
	<header class="space-y-4 max-w-3xl">
		<div class="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent dark:text-accent-dark font-medium">
			<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
			<span>Terbuka untuk Diskusi Proyek</span>
		</div>

		<h1 use:curtainReveal class="font-serif text-4xl sm:text-6xl font-normal text-ink dark:text-dark-text tracking-tight leading-[1.08]">
			Mari Berbicara &amp; Membangun Sesuatu yang Berarti.
		</h1>

		<p class="font-sans text-base sm:text-lg text-light-muted dark:text-dark-muted font-light leading-relaxed">
			Apakah Anda sedang merencanakan perombakan sistem desain, membangun platform web statis modern, atau sekadar ingin bertukar gagasan mengenai desain antarmuka? Pintu diskusi selalu terbuka.
		</p>
	</header>

	<!-- Hairline Divider -->
	<div class="w-full h-px bg-light-border dark:bg-dark-border"></div>

	<!-- Content Layout: Direct Contact Info + Clean Form with Scroll Reveal -->
	<div class="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
		<!-- Left Column: Direct Email & Channels -->
		<div use:reveal={{ delay: 60, y: 20 }} class="md:col-span-5 space-y-6">
			<!-- Direct Email Card -->
			<div class="p-6 rounded-2xl border border-light-border dark:border-dark-border bg-light-surface/40 dark:bg-dark-surface/40 space-y-4">
				<div class="space-y-1">
					<p class="text-xs uppercase tracking-widest text-light-muted dark:text-dark-muted">Email Langsung</p>
					<p class="font-serif text-2xl text-ink dark:text-dark-text">contact@domain.com</p>
				</div>

				<div class="flex items-center gap-3 pt-2">
					<a
						use:magnetic={{ strength: 0.25 }}
						href="mailto:contact@domain.com"
						class="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-hover text-xs font-medium transition-colors"
					>
						Kirim Email ↗
					</a>
					<button
						use:magnetic={{ strength: 0.25 }}
						type="button"
						onclick={copyEmail}
						class="px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-paper dark:bg-dark-bg text-ink dark:text-dark-text hover:border-accent dark:hover:border-accent-dark text-xs font-medium transition-colors"
					>
						{copied ? 'Tersalin! ✓' : 'Salin Alamat'}
					</button>
				</div>
			</div>

			<!-- Working Details & Timezone -->
			<div class="p-6 rounded-2xl border border-light-border dark:border-dark-border bg-light-surface/20 dark:bg-dark-surface/20 space-y-4 text-xs text-light-muted dark:text-dark-muted">
				<p class="text-xs uppercase tracking-wider text-ink dark:text-dark-text font-medium">Ketersediaan &amp; Waktu</p>
				<div class="space-y-2">
					<div class="flex items-center justify-between pb-2 border-b border-light-border/60 dark:border-dark-border/60">
						<span>Zona Waktu</span>
						<span class="font-mono text-ink dark:text-dark-text">WIB (UTC+7)</span>
					</div>
					<div class="flex items-center justify-between pb-2 border-b border-light-border/60 dark:border-dark-border/60">
						<span>Estimasi Respon</span>
						<span class="font-mono text-ink dark:text-dark-text">&lt; 24 Jam</span>
					</div>
					<div class="flex items-center justify-between">
						<span>Format Proyek</span>
						<span class="font-mono text-ink dark:text-dark-text">Kontrak / Freelance</span>
					</div>
				</div>
			</div>

			<!-- Social Links List -->
			<div class="p-6 rounded-2xl border border-light-border dark:border-dark-border bg-light-surface/20 dark:bg-dark-surface/20 space-y-3">
				<p class="text-xs uppercase tracking-wider text-ink dark:text-dark-text font-medium">Jaringan Profesional</p>
				<div class="space-y-2 text-sm">
					<a
						href="https://github.com"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center justify-between text-light-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-text transition-colors group"
					>
						<span>GitHub</span>
						<span class="text-xs group-hover:translate-x-0.5 transition-transform">↗</span>
					</a>
					<a
						href="https://linkedin.com"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center justify-between text-light-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-text transition-colors group"
					>
						<span>LinkedIn</span>
						<span class="text-xs group-hover:translate-x-0.5 transition-transform">↗</span>
					</a>
					<a
						href="https://x.com"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center justify-between text-light-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-text transition-colors group"
					>
						<span>Twitter / X</span>
						<span class="text-xs group-hover:translate-x-0.5 transition-transform">↗</span>
					</a>
				</div>
			</div>
		</div>

		<!-- Right Column: Simple Minimalist Contact Form with Scroll Reveal -->
		<div use:reveal={{ delay: 100, y: 20 }} class="md:col-span-7">
			<form
				onsubmit={handleFormSubmit}
				class="p-6 sm:p-8 rounded-3xl border border-light-border dark:border-dark-border bg-light-surface/40 dark:bg-dark-surface/40 space-y-6"
			>
				<div class="space-y-1">
					<h2 class="font-serif text-2xl font-normal text-ink dark:text-dark-text">
						Kirim Pesan Cepat
					</h2>
					<p class="text-xs text-light-muted dark:text-dark-muted font-light">
						Form ini akan langsung menyiapkan pesan email Anda tanpa perantara server.
					</p>
				</div>

				<div class="space-y-4">
					<!-- Name Input -->
					<div class="space-y-1.5">
						<label for="contact-name" class="block text-xs uppercase tracking-wider text-light-muted dark:text-dark-muted">
							Nama Lengkap
						</label>
						<input
							id="contact-name"
							type="text"
							required
							bind:value={name}
							placeholder="Contoh: Alex Pratama"
							class="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-paper dark:bg-dark-bg text-ink dark:text-dark-text placeholder:text-light-muted/50 dark:placeholder:text-dark-muted/50 text-sm focus:outline-none focus:border-accent dark:focus:border-accent-dark transition-colors"
						/>
					</div>

					<!-- Email Input -->
					<div class="space-y-1.5">
						<label for="contact-email" class="block text-xs uppercase tracking-wider text-light-muted dark:text-dark-muted">
							Alamat Email
						</label>
						<input
							id="contact-email"
							type="email"
							required
							bind:value={email}
							placeholder="alex@perusahaan.com"
							class="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-paper dark:bg-dark-bg text-ink dark:text-dark-text placeholder:text-light-muted/50 dark:placeholder:text-dark-muted/50 text-sm focus:outline-none focus:border-accent dark:focus:border-accent-dark transition-colors"
						/>
					</div>

					<!-- Subject / Topic Input -->
					<div class="space-y-1.5">
						<label for="contact-subject" class="block text-xs uppercase tracking-wider text-light-muted dark:text-dark-muted">
							Topik / Rencana Proyek
						</label>
						<input
							id="contact-subject"
							type="text"
							bind:value={subject}
							placeholder="Misal: Redesain Design System atau Konsultasi Web"
							class="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-paper dark:bg-dark-bg text-ink dark:text-dark-text placeholder:text-light-muted/50 dark:placeholder:text-dark-muted/50 text-sm focus:outline-none focus:border-accent dark:focus:border-accent-dark transition-colors"
						/>
					</div>

					<!-- Message Textarea -->
					<div class="space-y-1.5">
						<label for="contact-message" class="block text-xs uppercase tracking-wider text-light-muted dark:text-dark-muted">
							Detail Pesan
						</label>
						<textarea
							id="contact-message"
							rows="5"
							required
							bind:value={message}
							placeholder="Ceritakan sedikit tentang proyek, timeline, atau hal yang ingin Anda diskusikan..."
							class="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-paper dark:bg-dark-bg text-ink dark:text-dark-text placeholder:text-light-muted/50 dark:placeholder:text-dark-muted/50 text-sm focus:outline-none focus:border-accent dark:focus:border-accent-dark transition-colors resize-none"
						></textarea>
					</div>
				</div>

				<!-- Submit Button -->
				<button
					use:magnetic={{ strength: 0.2 }}
					type="submit"
					class="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-white hover:bg-accent-hover font-medium text-sm transition-colors shadow-sm"
				>
					<span>Buka di Aplikasi Email &amp; Kirim Pesan</span>
					<span>↗</span>
				</button>
			</form>
		</div>
	</div>
</section>

<script>
	import { reveal, curtainReveal, magnetic } from '$lib/animations';

	let copied = $state(false);
	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');

	function copyEmail() {
		navigator.clipboard.writeText('nasywanji@gmail.com');
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
		window.location.href = `mailto:nasywanji@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
	}
</script>

<svelte:head>
	<title>Contact — nasywandev</title>
	<meta name="description" content="Hubungi langsung untuk peluang proyek baru, konsultasi pengembangan, atau kolaborasi." />
	<meta property="og:title" content="Contact — nasywandev" />
	<meta property="og:description" content="Hubungi langsung untuk peluang proyek baru, konsultasi pengembangan, atau kolaborasi." />
	<meta property="og:type" content="website" />
</svelte:head>

<section class="max-w-4xl mx-auto space-y-10 sm:space-y-16">
	<!-- Page Header with Curtain Reveal -->
	<header class="space-y-3 sm:space-y-4 max-w-3xl">
		<div class="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent dark:text-accent-dark font-medium">
			<span class="w-1.5 h-1.5 rounded-full bg-accent dark:bg-accent-dark"></span>
			<span>Terbuka untuk Diskusi Proyek</span>
		</div>

		<h1 use:curtainReveal class="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-ink dark:text-dark-text tracking-tight leading-[1.12] sm:leading-[1.08]">
			Mari Berbicara &amp; Membangun Sesuatu yang Berarti.
		</h1>

		<p class="font-sans text-sm sm:text-base lg:text-lg text-light-muted dark:text-dark-muted font-light leading-relaxed">
			Apakah Anda sedang merencanakan perombakan sistem desain, membangun platform web statis modern, atau sekadar ingin bertukar gagasan mengenai desain antarmuka? Pintu diskusi selalu terbuka.
		</p>
	</header>

	<!-- Hairline Divider -->
	<div class="w-full h-px bg-light-border dark:bg-dark-border"></div>

	<!-- Content Layout: Direct Contact Info + Clean Form with Scroll Reveal -->
	<div class="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-12">
		<!-- Left Column: Direct Email & Channels -->
		<div use:reveal={{ delay: 40, y: 16 }} class="md:col-span-5 space-y-4 sm:space-y-6">
			<!-- Direct Email Card -->
			<div class="p-5 sm:p-6 rounded-2xl border border-light-border dark:border-dark-border bg-light-surface/40 dark:bg-dark-surface/40 space-y-4">
				<div class="space-y-1">
					<p class="text-xs uppercase tracking-widest text-light-muted dark:text-dark-muted">Email Langsung</p>
					<p class="font-serif text-xl sm:text-2xl text-ink dark:text-dark-text break-all">nasywanji@gmail.com</p>
				</div>

				<div class="flex flex-wrap items-center gap-2.5 pt-1">
					<a
						use:magnetic={{ strength: 0.25 }}
						href="mailto:nasywanji@gmail.com"
						class="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-accent text-white hover:bg-accent-hover text-xs font-medium transition-colors min-h-[44px]"
					>
						Kirim Email ↗
					</a>
					<button
						use:magnetic={{ strength: 0.25 }}
						type="button"
						onclick={copyEmail}
						class="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-paper dark:bg-dark-bg text-ink dark:text-dark-text hover:border-accent dark:hover:border-accent-dark text-xs font-medium transition-colors min-h-[44px]"
					>
						{copied ? 'Tersalin! ✓' : 'Salin Alamat'}
					</button>
				</div>
			</div>

			<!-- Working Details & Timezone -->
			<div class="p-5 sm:p-6 rounded-2xl border border-light-border dark:border-dark-border bg-light-surface/20 dark:bg-dark-surface/20 space-y-4 text-xs text-light-muted dark:text-dark-muted">
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

			<!-- Social Links List with Touch Targets -->
			<div class="p-5 rounded-2xl border border-light-border dark:border-dark-border bg-light-surface/20 dark:bg-dark-surface/20 space-y-1">
				<p class="text-xs uppercase tracking-wider text-ink dark:text-dark-text font-medium mb-2">Jaringan Profesional</p>
				<div class="space-y-0.5 text-sm">
					<a
						href="https://github.com/nasjiarr"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center justify-between text-light-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-text transition-colors py-2.5 px-1 min-h-[44px] group"
					>
						<span>GitHub</span>
						<span class="text-xs group-hover:translate-x-0.5 transition-transform">↗</span>
					</a>
					<a
						href="https://www.linkedin.com/in/nasywan-jibran-aryadi-7547a8214/"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center justify-between text-light-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-text transition-colors py-2.5 px-1 min-h-[44px] group"
					>
						<span>LinkedIn</span>
						<span class="text-xs group-hover:translate-x-0.5 transition-transform">↗</span>
					</a>
					</div>
			</div>
		</div>

		<!-- Right Column: Simple Minimalist Contact Form with Scroll Reveal -->
		<div use:reveal={{ delay: 80, y: 16 }} class="md:col-span-7">
			<form
				onsubmit={handleFormSubmit}
				class="p-5 sm:p-8 rounded-3xl border border-light-border dark:border-dark-border bg-light-surface/40 dark:bg-dark-surface/40 space-y-5 sm:space-y-6"
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
					<!-- Name Input (font-size >= 16px to prevent iOS auto-zoom) -->
					<div class="space-y-1.5">
						<label for="contact-name" class="block text-xs uppercase tracking-wider text-light-muted dark:text-dark-muted">
							Nama Lengkap
						</label>
						<input
							id="contact-name"
							type="text"
							required
							autocomplete="name"
							autocapitalize="words"
							enterkeyhint="next"
							bind:value={name}
							placeholder="Contoh: Alex Pratama"
							class="w-full px-4 py-3 min-h-[48px] rounded-xl border border-light-border dark:border-dark-border bg-paper dark:bg-dark-bg text-ink dark:text-dark-text placeholder:text-light-muted/50 dark:placeholder:text-dark-muted/50 text-base sm:text-sm focus:outline-none focus:border-accent dark:focus:border-accent-dark transition-colors"
						/>
					</div>

					<!-- Email Input (inputmode=email, font-size >= 16px to prevent iOS auto-zoom) -->
					<div class="space-y-1.5">
						<label for="contact-email" class="block text-xs uppercase tracking-wider text-light-muted dark:text-dark-muted">
							Alamat Email
						</label>
						<input
							id="contact-email"
							type="email"
							required
							autocomplete="email"
							inputmode="email"
							enterkeyhint="next"
							bind:value={email}
							placeholder="alex@perusahaan.com"
							class="w-full px-4 py-3 min-h-[48px] rounded-xl border border-light-border dark:border-dark-border bg-paper dark:bg-dark-bg text-ink dark:text-dark-text placeholder:text-light-muted/50 dark:placeholder:text-dark-muted/50 text-base sm:text-sm focus:outline-none focus:border-accent dark:focus:border-accent-dark transition-colors"
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
							enterkeyhint="next"
							bind:value={subject}
							placeholder="Misal: Redesain Design System atau Konsultasi Web"
							class="w-full px-4 py-3 min-h-[48px] rounded-xl border border-light-border dark:border-dark-border bg-paper dark:bg-dark-bg text-ink dark:text-dark-text placeholder:text-light-muted/50 dark:placeholder:text-dark-muted/50 text-base sm:text-sm focus:outline-none focus:border-accent dark:focus:border-accent-dark transition-colors"
						/>
					</div>

					<!-- Message Textarea -->
					<div class="space-y-1.5">
						<label for="contact-message" class="block text-xs uppercase tracking-wider text-light-muted dark:text-dark-muted">
							Detail Pesan
						</label>
						<textarea
							id="contact-message"
							rows="4"
							required
							enterkeyhint="done"
							bind:value={message}
							placeholder="Ceritakan sedikit tentang proyek, timeline, atau hal yang ingin Anda diskusikan..."
							class="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-paper dark:bg-dark-bg text-ink dark:text-dark-text placeholder:text-light-muted/50 dark:placeholder:text-dark-muted/50 text-base sm:text-sm focus:outline-none focus:border-accent dark:focus:border-accent-dark transition-colors resize-none"
						></textarea>
					</div>
				</div>

				<!-- Submit Button (Thumb-friendly touch target) -->
				<button
					use:magnetic={{ strength: 0.2 }}
					type="submit"
					class="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl bg-accent text-white hover:bg-accent-hover active:scale-[0.985] font-medium text-sm transition-all shadow-sm"
				>
					<span>Buka di Aplikasi Email &amp; Kirim Pesan</span>
					<span>↗</span>
				</button>
			</form>
		</div>
	</div>
</section>

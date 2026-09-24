<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} src
	 * @property {string} alt
	 * @property {string} [class]
	 * @property {'lazy' | 'eager' | null | undefined} [loading]
	 * @property {'high' | 'low' | 'auto' | undefined} [fetchpriority]
	 * @property {'async' | 'sync' | 'auto' | null | undefined} [decoding]
	 * @property {number} [width]
	 * @property {number} [height]
	 * @property {string} [sizes]
	 * @property {string} [style]
	 * @property {string} [viewTransitionName]
	 * @property {((node: HTMLElement, param?: any) => any) | undefined} [action]
	 * @property {any} [actionParam]
	 */

	/** @type {Props} */
	let {
		src,
		alt,
		class: className = '',
		style = '',
		viewTransitionName = '',
		loading = 'lazy',
		fetchpriority = undefined,
		decoding = 'async',
		width = 800,
		height = 500,
		sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px',
		action = undefined,
		actionParam = undefined
	} = $props();

	// Extract base path without extension
	const basePath = $derived(src.replace(/\.(svg|webp|avif|png|jpg|jpeg)$/, ''));

	// Combined inline style including view-transition-name
	const computedStyle = $derived(
		[style, viewTransitionName ? `view-transition-name: ${viewTransitionName};` : '']
			.filter(Boolean)
			.join(' ') || undefined
	);

	// Check if local project image with responsive variants
	const isProjectImage = $derived(src.includes('/images/projects/'));
</script>

{#if isProjectImage}
	<picture class="contents">
		<!-- Modern AVIF format with responsive sizes -->
		<source
			type="image/avif"
			srcset="{basePath}-400.avif 400w, {basePath}-800.avif 800w, {basePath}-1200.avif 1200w"
			{sizes}
		/>
		<!-- WebP format with responsive sizes -->
		<source
			type="image/webp"
			srcset="{basePath}-400.webp 400w, {basePath}-800.webp 800w, {basePath}-1200.webp 1200w"
			{sizes}
		/>
		<!-- Fallback Image with explicit dimensions and loading priority -->
		{#if action}
			<img
				use:action={actionParam}
				src="{basePath}.webp"
				{alt}
				class={className}
				style={computedStyle}
				{loading}
				{fetchpriority}
				{decoding}
				{width}
				{height}
			/>
		{:else}
			<img
				src="{basePath}.webp"
				{alt}
				class={className}
				style={computedStyle}
				{loading}
				{fetchpriority}
				{decoding}
				{width}
				{height}
			/>
		{/if}
	</picture>
{:else}
	{#if action}
		<img
			use:action={actionParam}
			{src}
			{alt}
			class={className}
			style={computedStyle}
			{loading}
			{fetchpriority}
			{decoding}
			{width}
			{height}
		/>
	{:else}
		<img
			{src}
			{alt}
			class={className}
			style={computedStyle}
			{loading}
			{fetchpriority}
			{decoding}
			{width}
			{height}
		/>
	{/if}
{/if}

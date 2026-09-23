import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('static/images/projects');
const files = ['editorial', 'fintech', 'commerce'];
const sizes = [400, 800, 1200];

async function convert() {
	for (const name of files) {
		const svgPath = path.join(dir, name + '.svg');
		const svgBuf = fs.readFileSync(svgPath);

		// Standard WebP & AVIF
		await sharp(svgBuf, { density: 150 })
			.resize(800, 500)
			.webp({ quality: 85 })
			.toFile(path.join(dir, name + '.webp'));

		await sharp(svgBuf, { density: 150 })
			.resize(800, 500)
			.avif({ quality: 80 })
			.toFile(path.join(dir, name + '.avif'));

		await sharp(svgBuf, { density: 150 })
			.resize(800, 500)
			.png()
			.toFile(path.join(dir, name + '.png'));

		// Responsive widths
		for (const w of sizes) {
			const h = Math.round(w * (500 / 800));
			await sharp(svgBuf, { density: Math.max(72, Math.round(150 * (w / 800))) })
				.resize(w, h)
				.webp({ quality: 85 })
				.toFile(path.join(dir, `${name}-${w}.webp`));

			await sharp(svgBuf, { density: Math.max(72, Math.round(150 * (w / 800))) })
				.resize(w, h)
				.avif({ quality: 80 })
				.toFile(path.join(dir, `${name}-${w}.avif`));
		}
		console.log('Successfully generated AVIF, WebP, PNG for:', name);
	}
}

convert().catch((err) => {
	console.error('Error converting images:', err);
	process.exit(1);
});

/**
 * Project metadata type definition
 * @typedef {Object} ProjectMetadata
 * @property {string} title
 * @property {string} slug
 * @property {string} description
 * @property {string} date
 * @property {string} year
 * @property {string} category
 * @property {boolean} [featured]
 * @property {string} image
 * @property {string[]} tags
 * @property {string} demoUrl
 * @property {string} repoUrl
 * @property {string} client
 * @property {string} role
 * @property {string} timeline
 */

/**
 * Returns all projects loaded from markdown files, sorted by date descending.
 * @returns {Promise<ProjectMetadata[]>}
 */
export async function getProjects() {
	/** @type {Record<string, any>} */
	const modules = import.meta.glob('/src/content/projects/*.md', { eager: true });
	/** @type {ProjectMetadata[]} */
	const projects = [];

	for (const path in modules) {
		const mod = modules[path];
		if (mod && mod.metadata) {
			const slug = path.split('/').pop()?.replace('.md', '') || mod.metadata.slug;
			projects.push({
				...mod.metadata,
				slug: mod.metadata.slug || slug
			});
		}
	}

	return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Returns featured projects.
 * @returns {Promise<ProjectMetadata[]>}
 */
export async function getFeaturedProjects() {
	const all = await getProjects();
	return all.filter((p) => p.featured);
}

/**
 * Returns a single project by its slug, containing both metadata and the compiled component.
 * @param {string} slug
 * @returns {Promise<{ metadata: ProjectMetadata, default: any } | null>}
 */
export async function getProject(slug) {
	/** @type {Record<string, () => Promise<any>>} */
	const modules = import.meta.glob('/src/content/projects/*.md');
	const key = `/src/content/projects/${slug}.md`;

	if (!modules[key]) {
		return null;
	}

	const mod = await modules[key]();
	return {
		metadata: {
			...mod.metadata,
			slug
		},
		default: mod.default
	};
}

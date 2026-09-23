import { getFeaturedProjects } from '$lib/projects';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load() {
	const featuredProjects = await getFeaturedProjects();
	return {
		featuredProjects
	};
}

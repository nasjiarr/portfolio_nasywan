import { getProjects } from '$lib/projects';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load() {
	const projects = await getProjects();
	return {
		projects
	};
}

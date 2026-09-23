import { getProject, getProjects } from '$lib/projects';
import { error } from '@sveltejs/kit';

export const prerender = true;

/** @type {import('./$types').EntryGenerator} */
export async function entries() {
	const projects = await getProjects();
	return projects.map((p) => ({ slug: p.slug }));
}

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const project = await getProject(params.slug);
	if (!project) {
		error(404, `Proyek dengan slug "${params.slug}" tidak ditemukan.`);
	}

	return {
		metadata: project.metadata,
		component: project.default
	};
}

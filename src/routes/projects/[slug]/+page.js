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

	const allProjects = await getProjects();
	const currentIndex = allProjects.findIndex((p) => p.slug === params.slug);

	const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
	const nextProject =
		currentIndex >= 0 && currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

	return {
		metadata: project.metadata,
		component: project.default,
		prevProject: prevProject ? { slug: prevProject.slug, title: prevProject.title } : null,
		nextProject: nextProject ? { slug: nextProject.slug, title: nextProject.title } : null
	};
}

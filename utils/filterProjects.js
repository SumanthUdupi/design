export function filterProjects(projects, selectedTags) {
  if (!selectedTags || selectedTags.length === 0) return projects;
  return projects.filter((p) => selectedTags.every((tag) => p.tags.includes(tag)));
}

export default filterProjects;

'use client';
import { useMemo, useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import projectsData from '../data/projects';
import { filterProjects } from '../utils/filterProjects';

export default function ProjectsGrid() {
  const [selected, setSelected] = useState(null);

  const allTags = useMemo(() => {
    const s = new Set();
    projectsData.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return Array.from(s);
  }, []);

  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => setSelectedTags([]);

  const filtered = useMemo(() => {
    try {
      return filterProjects(projectsData, selectedTags);
    } catch (e) {
      if (selectedTags.length === 0) return projectsData;
      return projectsData.filter((p) => selectedTags.every((tag) => p.tags.includes(tag)));
    }
  }, [selectedTags]);

  // Deep-link handling: open modal if URL hash contains project id, and listen for history changes
  useEffect(() => {
    function openFromHash() {
      try {
        const hash = window.location.hash || '';
        const m = hash.match(/#projects\/(.+)/);
        if (m && m[1]) {
          const id = m[1];
          const proj = projectsData.find((p) => p.id === id);
          if (proj) setSelected(proj);
        } else {
          setSelected(null);
        }
      } catch (e) {}
    }

    openFromHash();
    window.addEventListener('popstate', openFromHash);
    return () => window.removeEventListener('popstate', openFromHash);
  }, []);

  return (
    <section id="projects">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0, fontFamily: 'FrauncesLocal, Fraunces, Georgia, serif' }}>
          Projects
        </h2>
        <div style={{ opacity: 0.8 }}>
          {filtered.length} / {projectsData.length} projects
        </div>
      </div>

      <div
        className="filter-bar"
        style={{
          marginBottom: 20,
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`tag-pill ${selectedTags.includes(tag) ? 'active' : ''}`}
            onClick={() => toggleTag(tag)}
            aria-pressed={selectedTags.includes(tag)}
          >
            {tag}
          </button>
        ))}

        {selectedTags.length > 0 && (
          <button className="clear-filters" onClick={clearFilters} style={{ marginLeft: 6 }}>
            Clear filters
          </button>
        )}
      </div>

      <div className="projects-grid">
        {filtered.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            onOpen={(proj) => {
              setSelected(proj);
              try {
                window.history.pushState(
                  { projectId: proj.id },
                  proj.title,
                  `#projects/${proj.id}`
                );
              } catch (e) {}
            }}
          />
        ))}
      </div>

      <ProjectModal
        project={selected}
        onClose={() => {
          setSelected(null);
          try {
            window.history.pushState({}, '', '#projects');
          } catch (e) {}
        }}
      />
    </section>
  );
}

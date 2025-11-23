import { filterProjects } from '../utils/filterProjects';

const projects = [
  { id: 'a', tags: ['React', 'Design'] },
  { id: 'b', tags: ['CSS'] },
  { id: 'c', tags: ['React', 'CSS'] },
];

test('returns all when no tags selected', () => {
  expect(filterProjects(projects, [])).toHaveLength(3);
});

test('filters by single tag', () => {
  const res = filterProjects(projects, ['React']);
  expect(res.map((p) => p.id).sort()).toEqual(['a', 'c']);
});

test('filters with AND logic', () => {
  const res = filterProjects(projects, ['React', 'CSS']);
  expect(res.map((p) => p.id)).toEqual(['c']);
});

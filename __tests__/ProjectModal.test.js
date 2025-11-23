import { render, screen, fireEvent } from '@testing-library/react';
import ProjectModal from '../components/ProjectModal';
import projects from '../data/projects';

describe('ProjectModal', () => {
  test('Escape key calls onClose', () => {
    const proj = projects[0];
    const onClose = jest.fn();
    render(<ProjectModal project={proj} onClose={onClose} />);

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  test('Close button receives focus when modal opens', () => {
    const proj = projects[0];
    const onClose = jest.fn();
    render(<ProjectModal project={proj} onClose={onClose} />);

    const closeBtn = screen.getByLabelText(/Close/i);
    expect(document.activeElement).toBe(closeBtn);
  });
});

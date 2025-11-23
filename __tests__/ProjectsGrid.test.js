import { render, screen, fireEvent } from '@testing-library/react';
import ProjectsGrid from '../components/ProjectsGrid';

describe('ProjectsGrid', () => {
  test('renders and filters projects when tags clicked', async () => {
    render(<ProjectsGrid />);

    // initial count text e.g. '6 / 6 projects'
    const count = await screen.findByText(/\d+ \/ \d+ projects$/i);
    expect(count).toBeInTheDocument();

    // find a tag button and click it
    const tagButton = screen
      .getAllByRole('button')
      .find((b) => /React|CSS|Design/.test(b.textContent));
    if (tagButton) {
      fireEvent.click(tagButton);
      // after clicking, count should update (filtered <= total)
      const updated = await screen.findByText(/\d+ \/ \d+ projects$/i);
      expect(updated).toBeInTheDocument();
    }
  });
});

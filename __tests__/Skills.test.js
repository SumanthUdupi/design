import { render, screen, fireEvent } from '@testing-library/react';
import Skills from '../components/Skills';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, ...props }) => <div onClick={onClick} {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

describe('Skills Component', () => {
  it('renders skills section title', () => {
    render(<Skills />);
    expect(screen.getByText('Skills & Tools')).toBeInTheDocument();
  });

  it('renders skill cards', () => {
    render(<Skills />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('CSS / SCSS')).toBeInTheDocument();
  });

  it('opens modal when skill is clicked', () => {
    render(<Skills />);
    fireEvent.click(screen.getByText('React'));
    // Modal content
    expect(screen.getByText('My Journey')).toBeInTheDocument();
    expect(screen.getByText('Proficiency')).toBeInTheDocument();
  });
});

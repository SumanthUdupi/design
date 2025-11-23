import { render, screen, fireEvent } from '@testing-library/react';
import Contact from '../components/Contact';

describe('Contact Component', () => {
  it('renders the contact form', () => {
    render(<Contact />);
    expect(screen.getByText("Let's Create Something Together")).toBeInTheDocument();
    expect(screen.getByLabelText(/Tell me about your project/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
  });

  it('updates form fields', () => {
    render(<Contact />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('reveals easter egg when hidden element is clicked', () => {
    render(<Contact />);
    // The hidden element has title "?"
    const easterEgg = screen.getByTitle('?');
    fireEvent.click(easterEgg);
    expect(screen.getByText(/You found me/i)).toBeInTheDocument();
  });
});

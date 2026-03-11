import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
  it('renders the navbar and footer', () => {
    render(<App />);
    
    // Check if Navbar is present (assuming it has a nav role or specific text)
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();

    // Check if Footer is present
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
});
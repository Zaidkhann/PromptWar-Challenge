import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import Checklist from '../Checklist';

test('renders Checklist items', () => {
  render(<Checklist />);
  expect(screen.getByText('Voter Registration')).toBeInTheDocument();
  expect(screen.getByText('Know Your Candidates')).toBeInTheDocument();
});

test('toggles checklist item and updates aria-pressed', () => {
  render(<Checklist />);
  const button = screen.getByText('Voter Registration').closest('button');
  
  // Initially not pressed
  expect(button).toHaveAttribute('aria-pressed', 'false');
  
  // Click to press
  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-pressed', 'true');
});

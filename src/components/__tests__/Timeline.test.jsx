import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import Timeline from '../Timeline';

test('renders Timeline steps', () => {
  render(<Timeline />);
  expect(screen.getByText('Schedule Announcement')).toBeInTheDocument();
  expect(screen.getByText('Declaration of Results')).toBeInTheDocument();
});

test('expands timeline step on click', () => {
  render(<Timeline />);
  const button = screen.getByText('Schedule Announcement').closest('button');
  
  // Initially not expanded
  expect(button).toHaveAttribute('aria-expanded', 'false');
  
  // Click to expand
  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');
});

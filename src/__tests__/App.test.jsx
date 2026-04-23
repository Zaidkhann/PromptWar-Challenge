import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import App from '../App';

// Mock the lazy-loaded components to speed up and simplify App testing
vi.mock('./components/Timeline', () => ({
  default: () => <div data-testid="timeline-mock">Timeline</div>
}));
vi.mock('./components/Checklist', () => ({
  default: () => <div data-testid="checklist-mock">Checklist</div>
}));
vi.mock('./components/ChatAssistant', () => ({
  default: () => <div data-testid="chat-mock">ChatAssistant</div>
}));

test('renders App layout and title', () => {
  render(<App />);
  const titles = screen.getAllByText(/VANGUARD/i);
  expect(titles.length).toBeGreaterThan(0);
});

test('renders main sections', () => {
  render(<App />);
  expect(screen.getByText('The Process')).toBeInTheDocument();
  expect(screen.getByText('Voter Readiness')).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import ChatAssistant from '../ChatAssistant';

test('renders ChatAssistant input when key is missing', () => {
  // Mock the import.meta.env object for vitest
  vi.stubEnv('VITE_GEMINI_API_KEY', '');

  render(<ChatAssistant />);
  
  expect(screen.getByText('Welcome to Vanguard AI')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Paste your API key here...')).toBeInTheDocument();
  
  vi.unstubAllEnvs();
});

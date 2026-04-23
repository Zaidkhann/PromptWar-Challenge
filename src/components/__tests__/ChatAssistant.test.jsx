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

test('submits API key and shows chat interface', () => {
  vi.stubEnv('VITE_GEMINI_API_KEY', '');
  const { fireEvent } = require('@testing-library/react');
  render(<ChatAssistant />);
  
  const input = screen.getByPlaceholderText('Paste your API key here...');
  const button = screen.getByText('Start Chatting');
  
  fireEvent.change(input, { target: { value: 'test-api-key' } });
  fireEvent.click(button);
  
  expect(screen.getByText('Vanguard AI')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Ask anything about the elections...')).toBeInTheDocument();
  
  vi.unstubAllEnvs();
});

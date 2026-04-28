import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App.jsx';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('App', () => {
  it('renders project heading and requirement section', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'UP' })
    });

    render(<App />);

    expect(screen.getByRole('heading', { name: /exp10 ci\/cd demo/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /implemented requirements/i })).toBeInTheDocument();
    expect(await screen.findByText(/backend: up/i)).toBeInTheDocument();
  });
});

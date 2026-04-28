import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

describe('Form Component', () => {
  it('shows validation message on empty submit', () => {
    render(<Form />);
    fireEvent.submit(screen.getByTestId('test-form'));
    expect(screen.getByRole('alert')).toHaveTextContent('All fields are required.');
  });

  it('fills input fields and displays success message on submisson', async () => {
    render(<Form />);
    
    // Fill input fields
    await userEvent.type(screen.getByLabelText(/Email:/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/Password:/i), 'password123');
    
    // Trigger submit
    fireEvent.submit(screen.getByTestId('test-form'));
    
    // Assert success message
    expect(screen.getByRole('status')).toHaveTextContent('Form submitted successfully!');
    expect(screen.queryByRole('alert')).toBeNull();
  });
});
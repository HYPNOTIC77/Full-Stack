import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders the correct text', () => {
    render(<Button text="Click Me" />);
    expect(screen.getByTestId('custom-button')).toHaveTextContent('Click Me');
  });

  it('handles a click event', () => {
    const handleClick = jest.fn();
    render(<Button text="Click Me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByTestId('custom-button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
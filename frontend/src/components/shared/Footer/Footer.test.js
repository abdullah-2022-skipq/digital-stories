import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  test('renders Footer properly', () => {
    const { getByText } = render(<Footer />);
    const linkElement = getByText(/Made with/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders the heart emoji', () => {
    const { getByAltText } = render(<Footer />);
    const emoji = getByAltText(/heart/i);
    expect(emoji).toBeInTheDocument();
  });

  test('has the correct global css class in footer component', () => {
    const { getByTestId } = render(<Footer />);
    const footer = getByTestId('footer');
    expect(footer).toHaveClass('container');
  });

  test('has the correct local css class in footer component', () => {
    const { getByTestId } = render(<Footer />);
    const footer = getByTestId('footer');
    expect(footer).toHaveClass('footer');
  });
});

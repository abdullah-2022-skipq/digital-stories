import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner component', () => {
  test('renders Spinner properly', () => {
    render(<Spinner />);
  });

  test('has the correct local css class in span', () => {
    const { getByTestId } = render(<Spinner />);
    const span = getByTestId('spinner');
    expect(span).toHaveClass('message');
  });

  test('renders the message', () => {
    const message = 'Loading test';
    const { getByText } = render(<Spinner message={message} />);
    const textElement = getByText(message);
    expect(textElement).toBeInTheDocument();
  });

  test('renders the svg', () => {
    const { getByTestId } = render(<Spinner />);
    const svgElement = getByTestId('svg');
    expect(svgElement).toBeInTheDocument();
  });
});

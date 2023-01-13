import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
  test('renders Card properly', () => {
    render(<Card />);
  });

  test('has the correct local css class in outer div', () => {
    const { getByTestId } = render(<Card />);
    const outerDiv = getByTestId('card');
    expect(outerDiv).toHaveClass('card');
  });

  test('has the correct local css class in inner div', () => {
    const { getByTestId } = render(<Card />);
    const innerDiv = getByTestId('headingWrapper');
    expect(innerDiv).toHaveClass('headingWrapper');
  });

  test('renders the card heading', () => {
    const cardHeading = 'Card Heading';
    const { getByText } = render(<Card cardHeading={cardHeading} />);
    const heading = getByText(cardHeading);
    expect(heading).toBeInTheDocument();
  });

  test('renders the card logo', () => {
    const cardLogo = 'cardLogo.png';
    const { getByTestId } = render(<Card cardLogo={cardLogo} />);
    const imgElement = getByTestId('cardLogo');
    expect(imgElement).toHaveAttribute('src', `/images/${cardLogo}.png`);
  });

  test('renders children', () => {
    const children = <p>Children for test</p>;
    const { getByText } = render(<Card>{children}</Card>);
    const childrenElement = getByText(/Children for test/i);
    expect(childrenElement).toBeInTheDocument();
  });
});

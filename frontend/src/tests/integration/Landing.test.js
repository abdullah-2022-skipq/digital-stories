import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Landing from '../../pages/Landing/Landing';

describe('Landing Page', () => {
  test('renders all components without issues', () => {
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );

    const cardElement = getByTestId('cardWrapper');
    const buttonElement = getByTestId('button');
    const hasAccountAlreadyElement = getByTestId('hasAccountAlready');

    expect(cardElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
    expect(hasAccountAlreadyElement).toBeInTheDocument();

    expect(getByText(/Welcome/i)).toBeInTheDocument();
    expect(getByText(/Let's get started/i)).toBeInTheDocument();
  });
});

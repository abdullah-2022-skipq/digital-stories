import React from 'react';
import { render } from '@testing-library/react';
import SignIn from '../../pages/SignIn/SignIn';
import { Provider } from 'react-redux';
import store from '../../store';

describe('Sign In Page', () => {
  test('renders all components without issues', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );

    const cardElement = getByTestId('cardWrapper');
    const flexElement = getByTestId('cardFlex');

    expect(cardElement).toBeInTheDocument();
    expect(flexElement).toBeInTheDocument();

    expect(getByText(/Welcome Back/i)).toBeInTheDocument();
  });
});

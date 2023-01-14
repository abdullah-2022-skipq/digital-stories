import React from 'react';
import { getByText, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import rootReducer from '../../store/navbarSlice';
import Navigation from '../../components/shared/Navigation/Navigation';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';

describe('Navigation component', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        navbar: { activeRoute: 'home' },
        auth: { isAuth: true },
        user: {},
      },
    });
  });

  test('renders without issues', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </BrowserRouter>
    );

    expect(getByText('Digital Stories')).toBeInTheDocument();
  });
});

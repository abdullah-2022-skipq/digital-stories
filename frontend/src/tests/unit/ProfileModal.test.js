import React from 'react';
import { render } from '@testing-library/react';
import ProfileModal from '../../components/ProfileModal/ProfileModal';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../store/userSlice';

describe('ProfileModal component', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        auth: { isAuthenticated: true },
        user: {
          name: 'John Doe',
          username: 'johndoe2',
          avatar: 'http://localhost:5544/storage/default.png',
          memberSince: 'January 1, 2023',
        },
      },
    });
  });

  test('renders without issues', () => {
    render(
      <Provider store={store}>
        <ProfileModal />
      </Provider>
    );
  });

  test('renders correct data', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProfileModal />
      </Provider>
    );

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('@johndoe2')).toBeInTheDocument();
  });
});

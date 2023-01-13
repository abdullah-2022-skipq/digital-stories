import { render, screen } from '@testing-library/react';
import App from './App';

test('renders footer', () => {
  render(<App />);
  const linkElement = screen.getByText(/Made with/i);
  expect(linkElement).toBeInTheDocument();
});

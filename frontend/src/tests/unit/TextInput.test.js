import React from 'react';
import { render } from '@testing-library/react';
import TextInput from '../../components/shared/TextInput/TextInput';

describe('TextInput component', () => {
  test('renders TextInput properly', () => {
    render(<TextInput />);
  });

  test('has the correct local css class in input', () => {
    const { getByTestId } = render(<TextInput />);
    const inputElement = getByTestId('input');
    expect(inputElement).toHaveClass('textInput');
  });

  test('renders a text input', () => {
    const placeholderText = 'placeholder test';
    const { getByPlaceholderText } = render(
      <TextInput placeholder={placeholderText} />
    );
    const textInputElement = getByPlaceholderText(placeholderText);
    expect(textInputElement).toBeInTheDocument();
  });

  test('displays error message when error prop is true', () => {
    const errorMessage = 'error test';
    const { getByTestId } = render(
      <TextInput error={'true'} errormessage={errorMessage} />
    );
    const errorElement = getByTestId('error');
    expect(errorElement).toBeInTheDocument();
  });
});

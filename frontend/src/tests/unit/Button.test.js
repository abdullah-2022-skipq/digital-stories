import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../../components/shared/Button/Button';

describe('Button component', () => {
  test('renders Button properly', () => {
    render(<Button />);
  });

  test('renders button title', () => {
    const buttonTitle = 'Button Title';
    const { getByText } = render(<Button buttontitle={buttonTitle} />);
    const title = getByText(buttonTitle);
    expect(title).toBeInTheDocument();
  });

  test('renders button image', () => {
    const buttonImage = 'buttonImg';
    const { getByTestId } = render(<Button buttonimage={buttonImage} />);
    const imgElement = getByTestId('buttonImg');
    expect(imgElement).toHaveAttribute('src', `/images/${buttonImage}.png`);
  });

  test('calls onClick when clicked', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<Button onClick={onClick} />);
    const button = getByTestId('button');
    fireEvent.click(button);
    //
    expect(onClick).toHaveBeenCalled();
  });

  test('has the correct local class on button', () => {
    const { getByTestId } = render(<Button />);
    const button = getByTestId('button');
    expect(button).toHaveClass('button');
  });
});

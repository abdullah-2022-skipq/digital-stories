import React from 'react';
import { render } from '@testing-library/react';
import Comment from './Comment';

describe('Comment component', () => {
  test('renders Comment properly', () => {
    const comment = {
      username: 'John Doe',
      avatarPath: 'johnDoe.png',
      postedAt: '2023-01-13T00:00:00.000Z',
      text: 'comment text',
    };
    render(<Comment comment={comment} />);
  });

  test('renders Comment with correct data', () => {
    const comment = {
      username: 'John Doe',
      avatarPath: 'johnDoe.png',
      postedAt: '2023-01-13T00:00:00.000Z',
      text: 'comment text',
    };

    const { getByText, getByTestId } = render(<Comment comment={comment} />);
    const usernameElement = getByText(comment.username);
    const date = new Date(comment.postedAt).toDateString();

    const postedAtElement = getByText(date);

    const textElement = getByText(comment.text);
    const avatarPathElement = getByTestId('avatar');

    expect(usernameElement).toBeInTheDocument();
    expect(postedAtElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
    expect(avatarPathElement).toBeInTheDocument();
  });
});

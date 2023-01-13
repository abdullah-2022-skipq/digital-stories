import React from 'react';
import { render } from '@testing-library/react';
import CommentList from './CommentList';

describe('CommentList component', () => {
  test('renders CommentList properly', () => {
    const CommentList = {
      username: 'John Doe',
      avatarPath: 'johnDoe.png',
      postedAt: '2023-01-13T00:00:00.000Z',
      text: 'CommentList text',
    };
    render(<CommentList CommentList={CommentList} />);
  });

  test('renders CommentList with correct data', () => {
    const CommentList = {
      username: 'John Doe',
      avatarPath: 'johnDoe.png',
      postedAt: '2023-01-13T00:00:00.000Z',
      text: 'CommentList text',
    };

    const { getByText, getByTestId } = render(
      <CommentList CommentList={CommentList} />
    );
    const usernameElement = getByText(CommentList.username);
    const date = new Date(CommentList.postedAt).toDateString();

    const postedAtElement = getByText(date);

    const textElement = getByText(CommentList.text);
    const avatarPathElement = getByTestId('avatar');

    expect(usernameElement).toBeInTheDocument();
    expect(postedAtElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
    expect(avatarPathElement).toBeInTheDocument();
  });
});

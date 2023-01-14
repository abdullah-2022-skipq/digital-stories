import React from 'react';
import { render } from '@testing-library/react';
import CommentList from '../../components/Comments/CommentList/CommentList';

describe('CommentList component', () => {
  test('renders CommentList properly', () => {
    const commentList = [
      {
        username: 'John Doe',
        avatarPath: 'johnDoe.png',
        postedAt: '2023-01-13T00:00:00.000Z',
        text: 'CommentList text',
      },
    ];
    render(<CommentList comments={commentList} />);
  });

  test('renders CommentList with correct data', () => {
    const commentList = [
      {
        username: 'John Doe',
        avatarPath: 'johnDoe.png',
        postedAt: '2023-01-13T00:00:00.000Z',
        text: 'CommentList text',
      },
    ];

    const { getByText, getByTestId } = render(
      <CommentList comments={commentList} />
    );
    const usernameElement = getByText(commentList[0].username);
    const date = new Date(commentList[0].postedAt).toDateString();

    const postedAtElement = getByText(date);

    const textElement = getByText(commentList[0].text);
    const avatarPathElement = getByTestId('avatar');

    expect(usernameElement).toBeInTheDocument();
    expect(postedAtElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
    expect(avatarPathElement).toBeInTheDocument();
  });
});

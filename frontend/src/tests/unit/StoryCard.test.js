import React from 'react';
import { render } from '@testing-library/react';
import StoryCard from '../../components/shared/StoryCard/StoryCard';

describe('StoryCard component', () => {
  const story = {
    _id: 'add0123',
    mediaType: 'text',
    font: 'Times New Roman',
    fontColor: '#0077ff',
    caption: 'please get passed',
    avatarPath: 'http://localhost:5544/storage/default.png',
  };

  test('renders with correct data', () => {
    const { getByText } = render(<StoryCard story={story} />);

    expect(getByText(story.caption)).toBeInTheDocument();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import EngagementCard from '../../components/EngagementCard/EngagementCard';

describe('EngagementCard component', () => {
  test('renders without issues', () => {
    render(<EngagementCard />);
  });

  test('renders with correct values', () => {
    const { getByTestId } = render(
      <EngagementCard
        username="testUser"
        storyId="123"
        action="comment"
        goal="goalUser"
        date={new Date()}
      />
    );

    expect(getByTestId('user').textContent).toBe('testUser');

    expect(getByTestId('goal').textContent).toBe('goalUser');

    expect(getByTestId('storyId')).toHaveClass('story');
  });
});

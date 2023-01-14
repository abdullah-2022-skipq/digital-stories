import React from 'react';
import { render } from '@testing-library/react';
import LeaderboardCard from '../../components/LeaderboardCard/LeaderboardCard';

describe('LeaderboardCard Component', () => {
  test('renders without issues', () => {
    render(<LeaderboardCard />);
  });

  test('renders with correct data', () => {
    const { getByText } = render(
      <LeaderboardCard
        username="John Doe"
        avatar="http://localhost:5544/storage/default.png"
        numStories={15}
        numUpVotes={244}
      />
    );

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('15 Stories')).toBeInTheDocument();
    expect(getByText('244 Upvotes')).toBeInTheDocument();
  });
});

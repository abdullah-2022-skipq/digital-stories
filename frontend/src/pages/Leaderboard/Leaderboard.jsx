import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../../api';
import Spinner from '../../components/shared/Spinner/Spinner';
import LeaderboardCard from '../../components/LeaderboardCard/LeaderboardCard';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getLeaderboard();

      if (response.status === 200) {
        setLeaderboard(response.data.leaderboard);
      }
    })();
  }, []);

  if (!leaderboard) {
    return <Spinner message="Loading the Leaderboard, please wait" />;
  }

  return (
    <div className="container">
      <div>
        {leaderboard.map((user) => (
          <LeaderboardCard
            username={user.username}
            avatar={user.avatar}
            numStories={user.storyCount}
            numUpVotes={user.upVoteCount}
          />
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;

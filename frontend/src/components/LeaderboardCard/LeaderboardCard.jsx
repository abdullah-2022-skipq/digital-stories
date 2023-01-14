import React from 'react';
import styles from './LeaderboardCard.module.css';

function LeaderboardCard({ username, avatar, numStories, numUpVotes }) {
  return (
    <div className={styles.leaderboardCardWrapper}>
      <div className={styles.avatarWrapper}>
        <img className={styles.avataImager} src={avatar} alt="avatar" />
      </div>
      <div className={styles.data}>
        <span className={styles.username}>{username}</span>
        <span className={styles.numStories}> {numStories} Stories</span>

        <span className={styles.numUpVotes}>{numUpVotes} Upvotes</span>
      </div>
    </div>
  );
}

export default LeaderboardCard;

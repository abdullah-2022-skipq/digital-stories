import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './EngagementCard.module.css';

function EngagementCard({ username, storyId, action, goal, date }) {
  const navigate = useHistory();

  const dateFormatted = new Date(date).toDateString();

  const onStoryClickHandler = async () => {
    navigate.push('/story', { id: storyId });
  };

  return (
    <div className={styles.engagementCardWrapper}>
      <div>
        <span>
          <span className={styles.srcUser} data-testid="user">
            {username}
          </span>{' '}
          {action} {action === 'commented' && 'on'} a
          <span
            className={styles.story}
            onClick={onStoryClickHandler}
            data-testid="storyId"
          >
            <u>story</u>
          </span>
          by{' '}
          <span className={styles.goalUser} data-testid="goal">
            {goal}
          </span>{' '}
          on {dateFormatted}
        </span>
      </div>
    </div>
  );
}

export default EngagementCard;

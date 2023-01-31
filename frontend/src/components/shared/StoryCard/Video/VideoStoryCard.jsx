import React from 'react';
import styles from './VideoStoryCard.module.css';

function VideoStoryCard({ caption, video }) {
  return (
    <div className={styles.videoWrapper}>
      <video src={video} controls autoPlay muted />
      <p style={{ marginTop: '20px' }}>{caption}</p>
    </div>
  );
}

export default VideoStoryCard;

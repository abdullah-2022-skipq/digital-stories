import React from 'react';
import styles from './VideoStoryDetails.module.css';

function VideoStoryDetails({ video, caption }) {
  return (
    <div className={styles.videoWrapper}>
      <video src={video} controls autoPlay muted />
      <p>{caption}</p>
    </div>
  );
}

export default VideoStoryDetails;

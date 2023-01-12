import React from 'react';
import styles from './ImageStoryCard.module.css';

function ImageStoryDetails({ caption, image }) {
  return (
    <div className={styles.mediaWrapper}>
      <img src={image} alt="story-image" />
      <div>{caption}</div>
    </div>
  );
}

export default ImageStoryDetails;

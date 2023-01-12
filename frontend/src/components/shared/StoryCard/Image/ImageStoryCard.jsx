import React from 'react';
import styles from './ImageStoryCard.module.css';

function ImageStoryCard({ caption, image }) {
  return (
    <div>
      <img className={styles.image} src={image} alt="story-image" />
      <p>{caption}</p>
    </div>
  );
}

export default ImageStoryCard;

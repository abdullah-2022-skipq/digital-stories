import React from 'react';
import styles from './ImageStoryCard.module.css';

function ImageStoryCard({ caption, image }) {
  return (
    <div>
      <img className={styles.image} src={image} alt="story" />
      <p style={{ marginTop: '20px' }}>{caption}</p>
    </div>
  );
}

export default ImageStoryCard;

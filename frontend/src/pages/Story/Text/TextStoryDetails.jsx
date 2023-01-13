import React from 'react';
import styles from './TextStoryDetails.module.css';

function TextStoryDetails({ caption, font, fontColor }) {
  const color =
    fontColor === 'blue' || fontColor === '#0077ff'
      ? '#0077ff'
      : fontColor === 'pink' || fontColor === '#de1b55'
      ? '#de1b55'
      : '#33b357';

  return (
    <div className={styles.captionWrapper} style={{ color, fontFamily: font }}>
      {caption}
    </div>
  );
}

export default TextStoryDetails;

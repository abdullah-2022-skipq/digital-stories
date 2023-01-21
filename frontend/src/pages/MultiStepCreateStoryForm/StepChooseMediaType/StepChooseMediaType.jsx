import React, { useContext } from 'react';
import Card from '../../../components/shared/Card/Card';
import styles from './StepChooseMediaType.module.css';
import Button from '../../../components/shared/Button/Button';
import { globalContext } from '../../../App';

function StepChooseMediaType() {
  const { mediaType, setMediaType, onNextHandler } = useContext(globalContext);

  return (
    <div className="cardWrapper">
      <Card cardHeading="What do you want to post?" cardLogo="media-type">
        <div className={styles.selectWrapper}>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.groupButton} ${
                mediaType === 'Text' ? styles.active : ''
              }`}
              type="button"
              onClick={() => {
                setMediaType('Text');
              }}
            >
              Text
            </button>
            <button
              className={`${styles.groupButton} ${
                mediaType === 'Image' ? styles.active : ''
              }`}
              type="button"
              onClick={() => {
                setMediaType('Image');
              }}
            >
              Image
            </button>
            <button
              className={`${styles.groupButton} ${
                mediaType === 'Video' ? styles.active : ''
              }`}
              type="button"
              onClick={() => {
                setMediaType('Video');
              }}
            >
              Video
            </button>
          </div>

          <Button
            buttontitle="Next"
            buttonimage="arrow_right"
            onClick={onNextHandler}
          />
        </div>
      </Card>
    </div>
  );
}

export default StepChooseMediaType;

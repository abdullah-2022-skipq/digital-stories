import React, { useContext } from 'react';
import Card from '../../../components/shared/Card/Card';
import styles from './StepChooseMediaType.module.css';
import Button from '../../../components/shared/Button/Button';
import { globalContext } from '../../../context/globalContext';

function StepChooseMediaType() {
  const {
    mediaType,
    setMediaType,
    isPrivate,
    setIsPrivate,
    onNextHandler,
    setIsDraft,
  } = useContext(globalContext);

  setIsDraft(true);

  return (
    <div className="cardWrapper">
      <Card cardHeading="What do you want to post?" cardLogo="media-type">
        <div className={styles.selectWrapper}>
          {/* set story access mode  */}
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.groupButton} ${isPrivate && styles.active}`}
              type="button"
              onClick={() => {
                setIsPrivate(true);
              }}
              style={{
                color: '#de1b55',
              }}
            >
              Private
            </button>

            <button
              className={`${styles.groupButton} ${!isPrivate && styles.active}`}
              type="button"
              onClick={() => {
                setIsPrivate(false);
              }}
              style={{
                color: '#33b357',
              }}
            >
              Public
            </button>
          </div>

          {/* set media type  */}
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

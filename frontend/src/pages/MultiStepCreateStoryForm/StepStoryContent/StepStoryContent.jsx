import React, { useContext } from 'react';
import Card from '../../../components/shared/Card/Card';
import styles from './StepStoryContent.module.css';
import { globalContext } from '../../../context/globalContext';
import TextStory from '../../../components/CreateStory/TextStory/TextStory';
import ImageStory from '../../../components/CreateStory/ImageStory/ImageStory';
import VideoStory from '../../../components/CreateStory/VideoStory/VideoStory';

function StepStoryContent() {
  const { mediaType, onPrevHandler } = useContext(globalContext);

  return (
    <div className="cardWrapper">
      <div>
        <button className={styles.backArrow} type="button">
          <img
            src="/images/arrow_back.png"
            alt="arrow back"
            onClick={onPrevHandler}
            role="button"
          />
        </button>
        <Card cardHeading="Create a story" cardLogo="create-story">
          {mediaType === 'Text' && <TextStory />}
          {mediaType === 'Image' && <ImageStory />}
          {mediaType === 'Video' && <VideoStory />}
        </Card>
      </div>
    </div>
  );
}

export default StepStoryContent;

import React, { useContext } from 'react';
import Card from '../../../components/shared/Card/Card';
import styles from './StepStoryContent.module.css';
import TextStory from '../../../components/Story/Create/TextStory/TextStory';
import { globalContext } from '../../../App';
import ImageStory from '../../../components/Story/Create/ImageStory/ImageStory';
import VideoStory from '../../../components/Story/Create/VideoStory/VideoStory';

function StepStoryContent() {
  const { mediaType, onPrevHandler } = useContext(globalContext);

  return (
    <div className="cardWrapper">
      <div>
        <button className={styles.backArrow}>
          <img
            src="/images/arrow_back.png"
            alt="arrow back"
            onClick={onPrevHandler}
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

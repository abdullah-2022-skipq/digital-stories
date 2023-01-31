import React from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../../components/shared/Card/Card';
import TextStoryUpdate from './Text/TextStoryUpdate';
import ImageStoryUpdate from './Image/ImageStoryUpdate';
import VideoStoryUpdate from './Video/VideoStoryUpdate';

function UpdateStory() {
  const location = useLocation();
  const { story } = location.state;

  return (
    <div className="cardWrapper">
      <Card cardHeading="Update story">
        <div style={{ width: '90%' }}>
          {story.mediaType === 'text' && (
            <TextStoryUpdate
              storyId={story._id}
              prevCaption={story.caption}
              prevFontColor={story.fontColor}
              prevFont={story.font}
            />
          )}
        </div>
        <div>
          {story.mediaType === 'image' && (
            <ImageStoryUpdate
              storyId={story._id}
              prevCaption={story.caption}
              prevImage={story.image}
            />
          )}
        </div>
        <div>
          {story.mediaType === 'video' && (
            <VideoStoryUpdate
              storyId={story._id}
              prevVideo={story.video}
              prevCaption={story.caption}
            />
          )}
        </div>
      </Card>
    </div>
  );
}

export default UpdateStory;

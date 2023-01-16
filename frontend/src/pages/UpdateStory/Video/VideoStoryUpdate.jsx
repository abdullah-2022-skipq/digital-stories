import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './VideoStoryUpdate.module.css';
import Button from '../../../components/shared/Button/Button';
import { updateStory } from '../../../api';

function VideoStoryUpdate({ prevVideo, prevCaption, storyId }) {
  const [video, setVideo] = useState(prevVideo);

  const [caption, setCaption] = useState(prevCaption);

  const [hover, setHover] = useState(false);

  const navigate = useHistory();

  const updateStoryHandler = async () => {
    const story = {
      mediaType: 'video',
      caption,
      video: video === prevVideo ? '' : video,
      storyId,
    };

    const response = await updateStory(story);
    if (response.status === 200) {
      navigate.push('/');
    }
  };

  const getUserVideo = (e) => {
    const videoFile = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      setVideo(base64);
    };

    reader.readAsDataURL(videoFile);
  };

  return (
    <>
      <div className={styles.cardFlex}>
        <p className={styles.videoPromptHeading}>
          <span className={styles.videoWrapper}>
            <iframe className={styles.video} src={video} alt="video" />
          </span>

          <span className={styles.videoLabelWrapper}>
            <input
              className={styles.videoSelection}
              id="videoSelection"
              type="file"
              onChange={getUserVideo}
            />
            <label className={styles.videoLabel} htmlFor="videoSelection">
              Choose video (below 5mb)
            </label>
          </span>
        </p>
      </div>
      <textarea
        className={styles.caption}
        placeholder="Caption"
        maxLength={200}
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <Button
        buttontitle="Post"
        buttonimage="party_popper"
        onClick={updateStoryHandler}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ backgroundColor: hover ? '#1b8445' : '#20BD5F' }}
        disabled={caption === prevCaption && video === prevVideo}
      />
    </>
  );
}

export default VideoStoryUpdate;

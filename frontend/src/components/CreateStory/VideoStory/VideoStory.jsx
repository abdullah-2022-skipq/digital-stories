import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Lottie from 'react-lottie';
import videoAnimationData from '../../../lotties/facetime.json';
import styles from './VideoStory.module.css';
import Button from '../../shared/Button/Button';
import { globalContext } from '../../../App';
import { createStory } from '../../../api';

function VideoStory() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: videoAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const [video, setVideo] = useState('');

  const [caption, setCaption] = useState('');

  const [hover, setHover] = useState(false);

  const postedBy = useSelector((state) => state.user._id);

  const { onPrevHandler } = useContext(globalContext);

  const navigate = useHistory();

  const createStoryHandler = async () => {
    const story = {
      mediaType: 'video',
      caption,
      video,
      postedBy,
    };

    const response = await createStory(story);
    if (response.status === 201) {
      onPrevHandler(); // reset the create story form to step 1
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
            {video === '' ? (
              <Lottie options={defaultOptions} height={400} width={400} />
            ) : (
              <iframe className={styles.video} src={video} alt="video" />
            )}
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
        onClick={createStoryHandler}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ backgroundColor: hover ? '#1b8445' : '#20BD5F' }}
        disabled={video === 'https://www.youtube.com/embed/ScMzIvxBSi4'}
      />
    </>
  );
}

export default VideoStory;
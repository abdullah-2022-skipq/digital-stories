import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetActiveRoute } from '../../../store/navbarSlice';
import styles from './VideoStoryUpdate.module.css';
import Button from '../../../components/shared/Button/Button';
import { updateVideoStory } from '../../../api';

function VideoStoryUpdate({ prevVideo, prevCaption, storyId }) {
  const dispatch = useDispatch();

  const [video, setVideo] = useState(prevVideo);

  const [videoPreview, setVideoPreview] = useState(prevVideo);

  const [caption, setCaption] = useState(prevCaption);

  const [hover, setHover] = useState(false);

  const navigate = useHistory();

  const updateStoryHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('video', video);

    formData.append('storyId', storyId);
    formData.append('caption', caption);
    formData.append('mediaType', 'video');

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const response = await updateVideoStory(formData, config);

    if (response.status === 200) {
      dispatch(resetActiveRoute());
      navigate.push('/');
    }
  };
  return (
    <>
      <div className={styles.cardFlex}>
        <div className={styles.videoPromptHeading}>
          <span className={styles.videoWrapper}>
            <video
              className={styles.video}
              src={videoPreview}
              controls
              autoPlay
              muted
            />
          </span>

          <span className={styles.videoLabelWrapper}>
            <input
              className={styles.videoSelection}
              type="file"
              name="video"
              accept="video/*"
              id="videoSelectionInput"
              onChange={(e) => {
                setVideo(e.target.files[0]);
                setVideoPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />

            <label className={styles.videoLabel} htmlFor="videoSelectionInput">
              Choose video
            </label>
          </span>
        </div>
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

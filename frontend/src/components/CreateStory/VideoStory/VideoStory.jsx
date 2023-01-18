import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './VideoStory.module.css';
import Button from '../../shared/Button/Button';
import { globalContext } from '../../../App';
import { createVideoStory } from '../../../api';

function VideoStory() {
  const [video, setVideo] = useState('');

  const [caption, setCaption] = useState('');

  const [hover, setHover] = useState(false);

  const postedBy = useSelector((state) => state.user._id);

  const { onPrevHandler, clearContext } = useContext(globalContext);

  const navigate = useHistory();

  const createStoryHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('video', video);

    formData.append('postedBy', postedBy);
    formData.append('caption', caption);
    formData.append('mediaType', 'video');

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const response = await createVideoStory(formData, config);

    if (response.status === 201) {
      onPrevHandler(); // reset the create story form to step 1
      navigate.push('/');
    }
    clearContext();
  };

  return (
    <form onSubmit={createStoryHandler}>
      <div className={styles.cardFlex}>
        <div className={styles.videoPromptHeading}>
          <span className={styles.videoWrapper}>
            <iframe className={styles.video} src="" alt="video" />
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
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ backgroundColor: hover ? '#1b8445' : '#20BD5F' }}
        type="submit"
        disabled={video === ''}
      />
    </form>
  );
}

export default VideoStory;

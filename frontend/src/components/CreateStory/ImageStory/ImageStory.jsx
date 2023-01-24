import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './ImageStory.module.css';
import Button from '../../shared/Button/Button';
import { createStory } from '../../../api';
import { globalContext } from '../../../context/globalContext';

function ImageStory() {
  const [hover, setHover] = useState(false);

  const postedBy = useSelector((state) => state.user._id);

  const {
    isPrivate,
    clearContext,
    onPrevHandler,
    caption,
    setCaption,
    image,
    setImage,
  } = useContext(globalContext);

  const navigate = useHistory();

  const createStoryHandler = async () => {
    const story = {
      mediaType: 'image',
      caption,
      image,
      postedBy,
      isPrivate,
    };

    const response = await createStory(story);
    clearContext();
    if (response.status === 201) {
      onPrevHandler(); // reset the create story form to step 1
      navigate.push('/');
    }
  };

  const getUserImage = (e) => {
    const imgFile = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(imgFile);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  return (
    <>
      <div className={styles.cardFlex}>
        <p className={styles.imagePromptHeading}>
          <span className={styles.imageWrapper}>
            <img className={styles.imageImage} src={image} alt="story" />
          </span>
          <span className={styles.imageLabelWrapper}>
            <input
              className={styles.imageSelection}
              id="imageSelection"
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              onChange={getUserImage}
            />
            <label className={styles.imageLabel} htmlFor="imageSelection">
              Choose image
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
        disabled={image === '/images/default-image-story.png'}
      />
    </>
  );
}

export default ImageStory;

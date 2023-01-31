import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetActiveRoute } from '../../../store/navbarSlice';
import styles from './ImageStoryUpdate.module.css';
import Button from '../../../components/shared/Button/Button';
import { updateStory } from '../../../api';

function ImageStoryUpdate({ prevImage, prevCaption, storyId }) {
  const dispatch = useDispatch();

  const [image, setImage] = useState(prevImage);

  const [caption, setCaption] = useState(prevCaption);

  const [hover, setHover] = useState(false);

  const navigate = useHistory();

  const updateStoryHandler = async () => {
    const story = {
      mediaType: 'image',
      caption,
      image: image === prevImage ? '' : image,
      storyId,
    };

    const response = await updateStory(story);
    if (response.status === 200) {
      dispatch(resetActiveRoute());
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
        buttontitle="Update"
        buttonimage="party_popper"
        onClick={updateStoryHandler}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ backgroundColor: hover ? '#1b8445' : '#20BD5F' }}
        disabled={caption === prevCaption && image === prevImage}
      />
    </>
  );
}

export default ImageStoryUpdate;

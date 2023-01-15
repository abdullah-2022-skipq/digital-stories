import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Lottie from 'react-lottie';
import cameraAnimationData from '../../../lotties/camera.json';
import styles from './ImageStoryUpdate.module.css';
import Button from '../../../components/shared/Button/Button';
import { updateStory } from '../../../api';

function ImageStoryUpdate({ prevImage, prevCaption, storyId }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: cameraAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

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
            {image === '' ? (
              <Lottie options={defaultOptions} height={400} width={400} />
            ) : (
              <img className={styles.imageImage} src={image} alt="story" />
            )}
          </span>
          <span className={styles.imageLabelWrapper}>
            <input
              className={styles.imageSelection}
              id="imageSelection"
              type="file"
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

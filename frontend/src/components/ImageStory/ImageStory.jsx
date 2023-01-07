import React, { useState } from "react";
import styles from "./ImageStory.module.css";

const ImageStory = () => {
  const [picture, setPicture] = useState(
    "http://localhost:5544/storage/default.png"
  );

  const getUserImage = (e) => {
    const imgFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onloadend = function () {
      setPicture(reader.result);
    };
  };

  return (
    <>
      <div className={styles.cardFlex}>
        <p className={styles.avatarPromptHeading}>
          <span className={styles.avatarLabelWrapper}>
            <input
              className={styles.avatarSelection}
              id="avatarSelection"
              type="file"
              onChange={getUserImage}
            />
            <label className={styles.avatarLabel} htmlFor="avatarSelection">
              Choose image
            </label>
          </span>
        </p>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatarImage} src={picture} alt="avatar" />
        </div>
      </div>
      <textarea
        className={styles.caption}
        placeholder="Caption (image)"
        maxLength={200}
      />
    </>
  );
};

export default ImageStory;

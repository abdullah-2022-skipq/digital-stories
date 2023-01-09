import React, { useState, useContext } from "react";
import styles from "./ImageStory.module.css";
import Button from "../../../shared/Button/Button";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createStory } from "../../../../api";
import { globalContext } from "../../../../App";

const ImageStory = () => {
  const [image, setImage] = useState(
    "http://localhost:5544/storage/default_image_story.png"
  );

  const [caption, setCaption] = useState("");

  const [hover, setHover] = useState(false);

  const postedBy = useSelector((state) => state.user._id);

  const { onPrevHandler } = useContext(globalContext);

  const navigate = useHistory();

  const createStoryHandler = async () => {
    const story = {
      mediaType: "image",
      caption,
      image,
      postedBy,
    };

    const response = await createStory(story);
    if (response.status == 201) {
      onPrevHandler(); // reset the create story form to step 1
      navigate.push("/");
    }
  };

  const getUserImage = (e) => {
    const imgFile = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(imgFile);

    reader.onloadend = function () {
      setImage(reader.result);
    };
  };

  return (
    <>
      <div className={styles.cardFlex}>
        <p className={styles.imagePromptHeading}>
          <span className={styles.imageWrapper}>
            <img className={styles.imageImage} src={image} alt="image" />
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
        buttontitle="Post"
        buttonimage="party_popper"
        onClick={createStoryHandler}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ backgroundColor: hover ? "#0f6632" : "#20BD5F" }}
        disabled={
          image == "http://localhost:5544/storage/default_image_story.png"
        }
      />
    </>
  );
};

export default ImageStory;

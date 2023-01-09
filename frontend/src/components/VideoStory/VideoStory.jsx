import React, { useState, useContext } from "react";
import styles from "./VideoStory.module.css";
import Button from "../shared/Button/Button";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { globalContext } from "../../App";
import { createStory } from "../../api";

const VideoStory = () => {
  const [video, setVideo] = useState(
    "https://www.youtube.com/embed/ScMzIvxBSi4"
  );

  const [caption, setCaption] = useState("");

  const [hover, setHover] = useState(false);

  const postedBy = useSelector((state) => state.user._id);

  const { onPrevHandler } = useContext(globalContext);

  const navigate = useHistory();

  const createStoryHandler = async () => {
    const story = {
      mediaType: "video",
      caption,
      video,
      postedBy,
    };
    console.log("dto", story);
    const response = await createStory(story);
    if (response.status == 201) {
      onPrevHandler(); // reset the create story form to step 1
      navigate.push("/");
    }
  };

  const getUserVideo = (e) => {
    const videoFile = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = function () {
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
        onClick={createStoryHandler}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ backgroundColor: hover ? "#0f6632" : "#20BD5F" }}
        disabled={video == "https://www.youtube.com/embed/ScMzIvxBSi4"}
      />
    </>
  );
};

export default VideoStory;

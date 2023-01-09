import React from "react";
import styles from "./VideoStoryCard.module.css";

const VideoStoryCard = ({ caption, video }) => {
  return (
    <>
      <div className={styles.videoWrapper}>
        <video src={video} controls autoPlay muted></video>
        <p>{caption}</p>
      </div>
    </>
  );
};

export default VideoStoryCard;

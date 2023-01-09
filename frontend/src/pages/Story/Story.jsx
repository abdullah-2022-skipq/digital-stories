import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Story.module.css";

const Story = () => {
  const location = useLocation();
  const story = location.state;
  console.log(story);
  return (
    <>
      {/* <div>Story</div>
      <div>{location.state.caption}</div> */}
      <div className="container">
        <div className={styles.storyWrapper}>
          <div className={styles.right}>
            <div className={styles.mediaWrapper}>
              {/* render text, image, video */}
              {story.mediaType == "text" && <p>{story.caption}</p>}
              {story.mediaType == "image" && (
                <img src={story.image} alt="image" />
              )}
              {story.mediaType == "video" && (
                <video src={story.video} controls autoPlay muted></video>
              )}
            </div>
            <div className={styles.mediaStatsWrapper}>
              <p>{story.upVoteCount}</p>
              <p>{story.downVoteCount}</p>
              <p>{story.commentCount}</p>
            </div>
          </div>
          <div className={styles.left}>
            <div className={styles.commentsWrapper}></div>
            <input type="text" className={styles.comment} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Story;

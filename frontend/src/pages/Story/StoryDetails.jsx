import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./StoryDetails.module.css";
import TextStoryDetails from "./Text/TextStoryDetails";
import VideoStoryDetails from "./Video/VideoStoryDetails";
import ImageStoryDetails from "./Image/ImageStoryDetails";

const StoryDetails = () => {
  const location = useLocation();
  const story = location.state.story;
  const randomColor = location.state.randomColor;

  return (
    <>
      <div className="container">
        <div className={styles.storyWrapper}>
          <div className={styles.right}>
            <div className={styles.storyHeader}>
              <div
                className={styles.avatarWrapper}
                style={{ border: `3px solid ${randomColor}` }}
              >
                <img
                  className={styles.avatarImage}
                  src={story.postedBy_avatarPath}
                  alt="avatar"
                />
              </div>
              <p>@{story.postedBy_username}</p>
            </div>
            <div className={styles.mediaWrapper}>
              {story.mediaType == "text" && (
                <TextStoryDetails
                  caption={story.caption}
                  font={story.font}
                  fontColor={story.fontColor}
                />
              )}
              {story.mediaType == "image" && <ImageStoryDetails />}
              {story.mediaType == "video" && <VideoStoryDetails />}
            </div>
            <div className={styles.mediaStatsWrapper}>
              <div className={styles.mediaStats}>
                <p>{story.upVoteCount}</p>
                <p>{story.downVoteCount}</p>
                <p>{story.commentCount}</p>
                <p>{"%likes"}</p>
              </div>
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

export default StoryDetails;

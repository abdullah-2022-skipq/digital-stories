import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./StoryDetails.module.css";
import TextStoryDetails from "./Text/TextStoryDetails";
import VideoStoryDetails from "./Video/VideoStoryDetails";
import ImageStoryDetails from "./Image/ImageStoryDetails";
import CommentSection from "../../components/Comments/CommentSection";
import { mockComments } from "../../mock/mock-data";

const StoryDetails = () => {
  const location = useLocation();
  const story = location.state.story;
  const randomColor = location.state.randomColor;

  return (
    <>
      <div className="container">
        <div className={styles.storyWrapper}>
          <div className={styles.left}>
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
              <div className={styles.storyDataWrapper}>
                <div>@{story.postedBy_username}</div>
                <div className={styles.storyCreatedAt}>
                  {new Date(story.createdAt).toDateString()}
                </div>
              </div>
            </div>
            <div className={styles.mediaWrapper}>
              {story.mediaType == "text" && (
                <TextStoryDetails
                  caption={story.caption}
                  font={story.font}
                  fontColor={story.fontColor}
                />
              )}
              {story.mediaType == "image" && (
                <ImageStoryDetails
                  caption={story.caption}
                  image={story.image}
                />
              )}
              {story.mediaType == "video" && (
                <VideoStoryDetails
                  caption={story.caption}
                  video={story.video}
                />
              )}
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
          <div className={styles.right}>
            <div className={styles.commentsWrapper}>
              <CommentSection comments={mockComments} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryDetails;

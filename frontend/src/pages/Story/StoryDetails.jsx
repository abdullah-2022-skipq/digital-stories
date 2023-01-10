import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./StoryDetails.module.css";
import TextStoryDetails from "./Text/TextStoryDetails";
import VideoStoryDetails from "./Video/VideoStoryDetails";
import ImageStoryDetails from "./Image/ImageStoryDetails";
import CommentSection from "../../components/Comments/CommentSection";
import { mockComments } from "../../mock/mock-data";
import Spinner from "../../components/shared/Spinner/Spinner";
import { getStoryById, upVote } from "../../api";
import { useSelector } from "react-redux";

const StoryDetails = () => {
  const location = useLocation();
  const id = location.state.id;
  const randomColor = location.state.randomColor;
  const [story, setStory] = useState(null);

  const user = useSelector((state) => state.user._id);

  const upVoteHandler = async () => {
    const data = { user, post: id };
    const response = await upVote(data);
    console.log(response);
  };

  useEffect(() => {
    (async () => {
      const response = await getStoryById(id);

      // dirty fix
      let story = response.data.story;
      let targetData;

      let postedBy = story.postedBy;
      delete story.postedBy;

      const postedBySource = { ...postedBy };
      let postedByCleaned = {};

      for (let key in postedBySource) {
        if (postedBySource.hasOwnProperty(key)) {
          postedByCleaned["postedBy_" + key] = postedBySource[key];
        }
      }

      const parsedData = { ...story, ...postedByCleaned };
      targetData = parsedData;
      setStory(targetData);
      return;
    })();
  }, []);

  if (!story) {
    return <Spinner message="Loading story, please wait" />;
  }
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
              <CommentSection post={story._id} comments={mockComments} />
            </div>
            <button onClick={upVoteHandler}>
              <img src="/images/upvote-filled" alt="" />
            </button>
            <button>
              <img src="/images/downvote-filled" alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryDetails;

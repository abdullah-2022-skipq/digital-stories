import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "./StoryDetails.module.css";
import TextStoryDetails from "./Text/TextStoryDetails";
import VideoStoryDetails from "./Video/VideoStoryDetails";
import ImageStoryDetails from "./Image/ImageStoryDetails";
import CommentList from "../../components/Comments/CommentList";
import Spinner from "../../components/shared/Spinner/Spinner";
import {
  getStoryById,
  upVoteStory,
  createComment,
  getCommentsByPostId,
  downVoteStory,
} from "../../api";
import { useSelector } from "react-redux";
import TextInput from "../../components/shared/TextInput/TextInput";
import Button from "../../components/shared/Button/Button";

const StoryDetails = () => {
  const location = useLocation();
  const id = location.state.id;
  const randomColor = location.state.randomColor;
  const [story, setStory] = useState(null);

  const [hover, setHover] = useState(false);

  const user = useSelector((state) => state.user._id);

  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const [reload, setReload] = useState();

  const upVoteHandler = async () => {
    const data = { user, post: id };
    await upVoteStory(data);
    setReload(!reload);
    // maybe display a message what backend did but later
  };

  const downVoteHandler = async () => {
    const data = { user, post: id };
    await downVoteStory(data);
    setReload(!reload);
  };

  const commentInput = useRef(""); // focuses input when user clicks on comment button

  const [newComment, setNewComment] = useState("");

  const [storyComments, setStoryComments] = useState([]);

  const postCommentHandler = async () => {
    const data = { user, text: newComment, story: id };
    const response = await createComment(data);
    setNewComment("");
    setReload(!reload);
  };

  useEffect(() => {
    (async () => {
      const storyResponse = await getStoryById(id);

      let story = storyResponse.data.story;

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

      console.log("called");

      const commentsResponse = await getCommentsByPostId(id);

      setStoryComments(commentsResponse.data.comments);

      setStory(parsedData);
      return;
    })();
  }, [reload]);

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
                <div>
                  <img
                    src="/images/upvote-filled.png"
                    alt="upvote"
                    role="button"
                    onClick={upVoteHandler}
                  />
                  {story.upVoteCount}
                </div>

                <div>
                  <img
                    src="/images/downvote-filled.png"
                    alt="downvote"
                    role="button"
                    onClick={downVoteHandler}
                  />
                  {story.downVoteCount}
                </div>

                <div>
                  <img
                    src="/images/comment.png"
                    alt="comment"
                    role="button"
                    onClick={() =>
                      commentInput.current.childNodes[0].childNodes[0].focus()
                    }
                  />
                  {story.commentCount}
                </div>
                <p>{"%likes"}</p>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.commentsWrapper}>
              <CommentList comments={storyComments} />
              <div className={styles.postComment} ref={commentInput}>
                <TextInput
                  placeholder="Write a comment"
                  style={{ fontSize: "16px", padding: "8px 20px" }}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                />
                <Button
                  onClick={postCommentHandler}
                  buttontitle="Post"
                  buttonimage="party_popper"
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  style={{
                    padding: "5px 10px",
                    fontSize: "16px",
                    backgroundColor: hover ? "#1b8445" : "#20BD5F",
                  }}
                  disabled={newComment == ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryDetails;

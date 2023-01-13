import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './StoryDetails.module.css';
import TextStoryDetails from './Text/TextStoryDetails';
import VideoStoryDetails from './Video/VideoStoryDetails';
import ImageStoryDetails from './Image/ImageStoryDetails';
import CommentList from '../../components/Comments/CommentList';
import Spinner from '../../components/shared/Spinner/Spinner';
import {
  getStoryById,
  upVoteStory,
  createComment,
  getCommentsByPostId,
  downVoteStory,
  deletePostById,
} from '../../api';
import TextInput from '../../components/shared/TextInput/TextInput';
import Button from '../../components/shared/Button/Button';

function StoryDetails() {
  const location = useLocation();
  const { id } = location.state;
  const { randomColor } = location.state;
  const [story, setStory] = useState(null);

  const [hover, setHover] = useState(false);

  const user = useSelector((state) => state.user._id);

  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const [reload, setReload] = useState();

  const navigate = useHistory();

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

  const commentInput = useRef(''); // focuses input when user clicks on comment button

  const [newComment, setNewComment] = useState('');

  const [storyComments, setStoryComments] = useState([]);

  const [ownsStory, setOwnsStory] = useState(false);

  const postCommentHandler = async () => {
    const data = { user, text: newComment, story: id };
    const response = await createComment(data);
    setNewComment('');
    setReload(!reload);
  };

  const deleteStoryHandler = async () => {
    const response = await deletePostById(id);
    // [] check status code of response and then
    // redirect
    navigate.push('/');
  };
  useEffect(() => {
    (async () => {
      const storyResponse = await getStoryById(id);

      const storyRes = storyResponse.data.story;

      const commentsResponse = await getCommentsByPostId(id);

      setStoryComments(commentsResponse.data.comments);

      // check if user owns story
      if (user === storyRes.postedBy) {
        setOwnsStory(true);
      }
      setStory(storyRes);
    })();
  }, [reload]);

  if (!story) {
    return <Spinner message="Loading story, please wait" />;
  }
  return (
    <div className="container">
      <div className={styles.storyWrapper}>
        <div className={styles.left}>
          <div className={styles.storyHeader}>
            <div className={styles.storyHeaderFlex}>
              <div
                className={styles.avatarWrapper}
                style={{ border: `3px solid ${randomColor}` }}
              >
                <img
                  className={styles.avatarImage}
                  src={story.avatarPath}
                  alt="avatar"
                />
              </div>
              <div className={styles.storyDataWrapper}>
                <div>@{story.username}</div>
                <div className={styles.storyCreatedAt}>
                  {new Date(story.createdAt).toDateString()}
                </div>
              </div>
            </div>
            {ownsStory && (
              <div className={story.updateOrDeleteControls}>
                <button>Update</button>
                <button onClick={deleteStoryHandler}>Delete</button>
              </div>
            )}
          </div>
          <div className={styles.mediaWrapper}>
            {story.mediaType === 'text' && (
              <TextStoryDetails
                caption={story.caption}
                font={story.font}
                fontColor={story.fontColor}
              />
            )}
            {story.mediaType === 'image' && (
              <ImageStoryDetails caption={story.caption} image={story.image} />
            )}
            {story.mediaType === 'video' && (
              <VideoStoryDetails caption={story.caption} video={story.video} />
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
              <p>%likes</p>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.commentsWrapper}>
            <CommentList comments={storyComments} />
            <div className={styles.postComment} ref={commentInput}>
              <TextInput
                placeholder="Write a comment"
                style={{ fontSize: '16px', padding: '8px 20px' }}
                value={newComment}
                onChange={(e) => {
                  setNewComment(e.target.value);
                }}
                onKeyDown={(e) =>
                  e.key === 'Enter' ? postCommentHandler() : ''
                }
              />
              <Button
                onClick={postCommentHandler}
                buttontitle="Post"
                buttonimage="party_popper"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                  padding: '5px 10px',
                  fontSize: '16px',
                  backgroundColor: hover ? '#1b8445' : '#20BD5F',
                }}
                disabled={newComment === ''}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryDetails;

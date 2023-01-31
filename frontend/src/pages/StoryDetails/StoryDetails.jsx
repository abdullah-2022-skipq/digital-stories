import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './StoryDetails.module.css';
import TextStoryDetails from './Text/TextStoryDetails';
import VideoStoryDetails from './Video/VideoStoryDetails';
import ImageStoryDetails from './Image/ImageStoryDetails';
import CommentList from '../../components/Comments/CommentList/CommentList';
import Spinner from '../../components/shared/Spinner/Spinner';
import {
  getStoryById,
  upVoteStory,
  createComment,
  getCommentsByPostId,
  downVoteStory,
  deletePostById,
  getVoteStatus,
  getNumUsers,
  updateStoryAccessMode,
} from '../../api';
import TextInput from '../../components/shared/TextInput/TextInput';
import Button from '../../components/shared/Button/Button';

function StoryDetails() {
  const location = useLocation();

  const { id } = location.state;

  const randomColor = location.state.randomColor || '#4B47DB';

  const [story, setStory] = useState(null);

  const [numUsers, setNumUsers] = useState(0);

  const [hover, setHover] = useState(false);

  const user = useSelector((state) => state.user._id);

  const [voteStatus, setVoteStatus] = useState('novote');

  const [reload, setReload] = useState();

  const navigate = useHistory();

  const upVoteHandler = async () => {
    const data = { user, post: id };
    await upVoteStory(data);
    setReload(!reload);
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

    if (response.status === 201) {
      setNewComment('');
      setReload(!reload);
    }
  };

  const deleteStoryHandler = async () => {
    const response = await deletePostById(id);

    if (response.status === 200) {
      navigate.push('/');
    }
  };

  const changeAccessModeHandler = async () => {
    const response = await updateStoryAccessMode(id, !story.isPrivate);

    if (response.status === 200) {
      setReload(!reload);
    }
  };

  const updateStoryHandler = async () => {
    navigate.push('/update-story', { story });
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

      // check vote status for this post
      const response = await getVoteStatus(user, id);

      if (response.status === 200) {
        if (response.data.voteStatus === 'upvote') {
          setVoteStatus('upvote');
        } else if (response.data.voteStatus === 'downvote') {
          setVoteStatus('downvote');
        } else {
          setVoteStatus('novote');
        }
      }

      const users = await getNumUsers();

      if (users.status === 200) {
        setNumUsers(users.data.numUsers);
      }

      setStory(storyRes);
    })();
  }, [reload, voteStatus]);

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
                style={{ border: `3.5px solid ${randomColor}` }}
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
              <div className={styles.updateOrDeleteControls}>
                <div className={styles.buttonGroup}>
                  <button
                    className={`${styles.groupButton} ${
                      story.isPrivate && styles.active
                    }`}
                    type="button"
                    onClick={() => {
                      changeAccessModeHandler();
                    }}
                    style={
                      story.isPrivate
                        ? {
                            color: '#33b357',
                          }
                        : {
                            color: '#de1b55',
                          }
                    }
                  >
                    Make {story.isPrivate ? 'Public' : 'Private'}
                  </button>
                </div>
                <button className={styles.updateStoryButton} type="button">
                  <img
                    role="button"
                    src="/images/update-story.png"
                    alt="update-story"
                    title="update story"
                    onClick={updateStoryHandler}
                  />
                </button>
                <button className={styles.deleteStoryButton} type="button">
                  <img
                    role="button"
                    src="/images/delete-story.png"
                    alt="delete-story"
                    title="delete story"
                    onClick={deleteStoryHandler}
                  />
                </button>
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
                  src={
                    voteStatus === 'upvote'
                      ? '/images/upvote-filled.png'
                      : '/images/upvote.png'
                  }
                  alt="upvote"
                  role="button"
                  onClick={upVoteHandler}
                  title="upvotes"
                />
                {story.upVoteCount}
              </div>

              <div>
                <img
                  src={
                    voteStatus === 'downvote'
                      ? '/images/downvote-filled.png'
                      : '/images/downvote.png'
                  }
                  alt="downvote"
                  role="button"
                  onClick={downVoteHandler}
                  title="downvotes"
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
                  title="comments"
                />
                {story.commentCount}
              </div>
              <div>
                <img
                  src="/images/percentage-liked.png"
                  alt="percent-liked"
                  width={30}
                  height={30}
                  style={{ cursor: 'default' }}
                  title="percent of total users reacted"
                />
                {(
                  (story.upVoteCount +
                    story.downVoteCount +
                    story.commentCount) /
                  numUsers
                ).toFixed(2)}
                %
              </div>
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

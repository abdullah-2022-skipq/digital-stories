import React from 'react';
import styles from './Comment.module.css';

function Comment({ comment }) {
  const date = new Date(comment.postedAt).toDateString();

  return (
    <div className={styles.comment}>
      <div className={styles.avatarWrapper}>
        <img
          className={styles.commentAvatar}
          src={comment.avatarPath}
          alt="avatar"
        />
      </div>
      <div className={styles.commentHeader}>
        <div className={styles.username}>{comment.username}</div>
        <div className={styles.date}>{date}</div>
        <div className={styles.commentText}>{comment.text}</div>
      </div>
    </div>
  );
}

export default Comment;

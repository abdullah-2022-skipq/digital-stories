import React from "react";
import styles from "./Comment.module.css";

const Comment = ({ comment }) => {
  return (
    <>
      <div className={styles.comment}>
        <div className={styles.avatarWrapper}>
          <img
            className={styles.commentAvatar}
            src={comment.avatarPath}
            alt="avatar"
          />
        </div>
        <div className={styles.commentContent}>
          <div className={styles.commentHeader}>
            <span className={styles.username}>{comment.username}</span>
            <span className={styles.date}>{comment.postedAt}</span>
          </div>
          <p className={styles.commentText}>{comment.text}</p>
        </div>
      </div>
    </>
  );
};

export default Comment;

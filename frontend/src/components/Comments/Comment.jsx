import React from "react";
import styles from "./Comment.module.css";

const Comment = ({ comment }) => {
  console.log(comment);
  return (
    <div className={styles.comment}>
      <div className={styles.avatarWrapper}>
        <img
          className={styles.commentAvatar}
          src={comment.avatar}
          alt="avatar"
        />
      </div>
      <div className={styles.commentContent}>
        <div className={styles.commentHeader}>
          <span className={styles.username}>{comment.username}</span>
          <span className={styles.date}>{comment.date}</span>
        </div>
        <p className={styles.commentText}>{comment.text}</p>
      </div>
    </div>
  );
};

export default Comment;

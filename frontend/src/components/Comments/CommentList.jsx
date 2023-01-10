import React from "react";
import styles from "./CommentList.module.css";
import Comment from "./Comment";

const CommentList = ({ comments }) => {
  return (
    <div className={styles.commentList}>
      {comments.map((comment, i) => (
        <Comment key={i} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;

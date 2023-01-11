import React from "react";
import styles from "./CommentList.module.css";
import Comment from "./Comment";

const CommentList = ({ comments }) => {
  return (
    <>
      {console.log(comments)}
      <div className={styles.commentListWrapper}>
        <div className={styles.commentList}>
          {comments.map((comment, i) => (
            <Comment key={i} comment={comment} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CommentList;

import React, { useState } from "react";
import CommentList from "./CommentList";
import styles from "./CommentSection.module.css";

const CommentSection = ({ comments }) => {
  const [newComment, setNewComment] = useState("");

  const onChangeHandler = (e) => {
    setNewComment(e.target.value);
  };

  const onSubmitHandler = (e) => {};

  return (
    <div className={styles.commentSectionWrapper}>
      <CommentList comments={comments} />

      <div className={styles.commentForm}>
        <input
          type="text"
          value={newComment}
          onChange={onChangeHandler}
          placeholder={"Post a comment..."}
        />
        <button onClick={onSubmitHandler}>Post</button>
      </div>
    </div>
  );
};

export default CommentSection;

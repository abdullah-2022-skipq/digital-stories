import React, { useState } from "react";
import CommentList from "./CommentList";
import styles from "./CommentSection.module.css";
import TextInput from "../shared/TextInput/TextInput";
import Button from "../shared/Button/Button";

const CommentSection = ({ comments }) => {
  const [newComment, setNewComment] = useState("");

  const onChangeHandler = (e) => {
    setNewComment(e.target.value);
  };

  const onSubmitHandler = (e) => {};

  return (
    <div className={styles.commentSectionWrapper}>
      <CommentList comments={comments} />
      <div
        style={{
          marginTop: "5px",
          borderBottom: "3px solid #b6afba",
          width: "100%",
        }}
      ></div>
      <div className={styles.commentForm}>
        <TextInput
          value={newComment}
          onChange={onChangeHandler}
          placeholder="Post a comment"
          style={{ fontSize: "16px", padding: "8px 20px" }}
        />

        <Button
          onClick={onSubmitHandler}
          buttontitle="Post"
          buttonimage="arrow_right"
          style={{ padding: "5px 10px", fontSize: "16px" }}
        />
      </div>
    </div>
  );
};

export default CommentSection;

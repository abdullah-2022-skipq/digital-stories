import React, { useState } from "react";
import CommentList from "./CommentList";
import styles from "./CommentSection.module.css";
import TextInput from "../shared/TextInput/TextInput";
import Button from "../shared/Button/Button";
import { createComment } from "../../api";
import { useSelector } from "react-redux";

const CommentSection = ({ post, comments }) => {
  const [newComment, setNewComment] = useState("");

  const user = useSelector((state) => state.user._id);

  const onChangeHandler = (e) => {
    setNewComment(e.target.value);
  };

  const onSubmitHandler = async () => {
    console.log("clicked");
    const data = { user, text: newComment, post: post };
    const response = await createComment(data);
    console.log(response);
    setNewComment("");
  };

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
          placeholder="Post a comment..."
          style={{ fontSize: "16px", padding: "8px 20px" }}
        />

        <Button
          onClick={onSubmitHandler}
          buttontitle="Post"
          buttonimage="arrow_right"
          style={{ padding: "5px 10px", fontSize: "16px" }}
          disabled={newComment == ""}
        />
      </div>
    </div>
  );
};

export default CommentSection;

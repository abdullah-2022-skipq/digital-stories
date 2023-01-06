import React from "react";
import styles from "./StoryCard.module.css";

const StoryCard = ({ story }) => {
  return (
    <div className={styles.card}>
      <div className={styles.mediaWrapper}>
        <div>
          <h3 className={styles.caption}>{story.caption}</h3>
          <img
            src="https://source.unsplash.com/random/250×250/?nature"
            alt="story image"
            width={300}
            height={250}
            className={styles.storyImg}
          />
          <p className={styles.createdBy}>{story.created_by}</p>
        </div>

        <div className={styles.storyStats}>
          <div className={styles.statBlock}>
            <img src="/images/like.png" alt="likes" />
            {story.like_count}
          </div>

          <div className={styles.statBlock}>
            <img src="/images/dislike.png" alt="dislikes" />
            {story.dislike_count}
          </div>

          <div className={styles.statBlock}>
            <img src="/images/comment.png" alt="comments" />
            {story.like_count}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default StoryCard;

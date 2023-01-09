import React from "react";
import styles from "./StoryCard.module.css";
import { useHistory } from "react-router-dom";
import StoryCardText from "./Text/StoryCardText";

// https://source.unsplash.com/random/250×250/?nature
const StoryCard = ({ story }) => {
  const navigate = useHistory();

  const onStoryClickHandler = async (e) => {
    navigate.push("/story", story);
  };

  const avatarWrapperColors = [
    "#266CFF",
    "#4B47DB",
    "#33B357",
    "#F539",
    "#DE1B55",
    "#E9362F",
  ];

  let randomColor =
    avatarWrapperColors[Math.floor(Math.random() * avatarWrapperColors.length)];

  return (
    <div className={styles.card} onClick={(e) => onStoryClickHandler(e)}>
      <div className={styles.mediaWrapper}>
        {story.mediaType == "text" && (
          <StoryCardText
            caption={story.caption}
            font={story.font}
            fontColor={story.fontColor}
          />
        )}
      </div>
      <div
        className={styles.avatarWrapper}
        style={{ border: `3px solid ${randomColor}` }}
      >
        <img
          className={styles.avatarImage}
          src={story.postedBy_avatarPath}
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default StoryCard;

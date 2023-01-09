import React from "react";
import styles from "./StoryCard.module.css";
import { useHistory } from "react-router-dom";
import Story from "../../../pages/Story/Story";
// import { getStoryById } from "../../../api/";

// https://source.unsplash.com/random/250×250/?nature
const StoryCard = ({ story }) => {
  const navigate = useHistory();

  const onStoryClickHandler = async (e) => {
    navigate.push("/story", story);
    // console.log("before", story);
    // const response = await getStoryById(story._id);

    // if (response.status == 200) {
    //   console.log(response.data);
    // }
  };

  return (
    <div className={styles.card} onClick={(e) => onStoryClickHandler(e)}>
      <div className={styles.mediaWrapper}>
        {story.image && <img src={story.image} alt="story image" />}
        {story.caption}@{story.postedBy}
      </div>
      <div></div>
    </div>
  );
};

export default StoryCard;

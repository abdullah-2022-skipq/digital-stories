import React, { useState, useContext } from "react";
import Card from "../../../components/shared/Card/Card";
import styles from "./StepStoryContent.module.css";
import Button from "../../../components/shared/Button/Button";
import TextStory from "../../../components/TextStory/TextStory";
import { globalContext } from "../../../App";
import ImageStory from "../../../components/ImageStory/ImageStory";

const StepStoryContent = () => {
  const [hover, setHover] = useState(false);

  const { mediaType, onPrevHandler } = useContext(globalContext);

  return (
    <>
      <div className="cardWrapper">
        <div>
          <button className={styles.backArrow}>
            <img
              src="/images/arrow_back.png"
              alt="arrow back"
              onClick={onPrevHandler}
            />
          </button>
          <Card cardHeading="Create a story" cardLogo="create-story">
            {mediaType == "Text" && <TextStory />}
            {mediaType == "Image" && <ImageStory />}
            {mediaType == "Video" && ";s;s"}
            <Button
              buttontitle="Post"
              buttonimage="party_popper"
              onClick={() => {}}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{ backgroundColor: hover ? "#0f6632" : "#20BD5F" }}
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default StepStoryContent;

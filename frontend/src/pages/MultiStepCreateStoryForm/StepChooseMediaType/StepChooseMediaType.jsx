import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import styles from "./StepChooseMediaType.module.css";
import Button from "../../../components/shared/Button/Button";

const StepChooseMediaType = ({ onNext }) => {
  const [mediaType, setMediaType] = useState("Text");

  return (
    <div className="cardWrapper">
      <Card cardHeading="What do you want to post?">
        <div className={styles.selectWrapper}>
          <select
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
            <option value="Video">Video</option>
          </select>
          <Button
            buttontitle="Next"
            buttonimage="arrow_right"
            onClick={onNext}
          />
        </div>
      </Card>
    </div>
  );
};

export default StepChooseMediaType;

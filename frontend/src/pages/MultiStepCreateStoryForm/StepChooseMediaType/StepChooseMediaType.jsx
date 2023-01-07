import React from "react";
import Card from "../../../components/shared/Card/Card";
import styles from "./StepChooseMediaType.module.css";

const StepChooseMediaType = () => {
  return (
    <div className="cardWrapper">
      <Card cardHeading="Create a story">
        <div className={styles.selectWrapper}>
          <select name="" id="">
            <option selected disabled>
              Select media type
            </option>
            <option value="">Text</option>
            <option value="">Image</option>
            <option value="">Video</option>
          </select>
        </div>
      </Card>
    </div>
  );
};

export default StepChooseMediaType;

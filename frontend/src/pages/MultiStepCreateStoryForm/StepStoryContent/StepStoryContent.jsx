import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import styles from "./StepStoryContent.module.css";

const StepStoryContent = ({ mediaType }) => {
  const [fontType, setFontType] = useState("Font 1");

  return (
    <div className="cardWrapper">
      <Card cardHeading="Create a story" cardLogo="create-story">
        <textarea id="w3review" name="w3review" rows="4" cols="50">
          At w3schools.com you will learn how to make a website. They offer free
          tutorials in all web development technologies.
        </textarea>
        <div>
          <div className={styles.selectWrapper}>
            <div>Choose font</div>
            <select
              value={fontType}
              onChange={(e) => setFontType(e.target.value)}
            >
              <option value="Font 1">Font 1</option>
              <option value="Font 2">Font 2</option>
              <option value="Font 3">Font 3</option>
            </select>
          </div>

          <div>
            <div
              style={{
                backgroundColor: "red",
                width: "100px",
                height: "100px",
              }}
            />
            <div
              style={{
                backgroundColor: "green",
                width: "100px",
                height: "100px",
              }}
            />
            <div
              style={{
                backgroundColor: "blue",
                width: "100px",
                height: "100px",
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StepStoryContent;

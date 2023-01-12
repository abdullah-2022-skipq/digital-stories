import React, { useContext, useState } from "react";
import styles from "./TextStory.module.css";
import Button from "../../../shared/Button/Button";
import { createStory } from "../../../../api";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { globalContext } from "../../../../App";

const TextStory = () => {
  const { onPrevHandler } = useContext(globalContext);

  const postedBy = useSelector((state) => state.user._id);

  const blue = "#0077ff";
  const green = "#33b357";
  const pink = "#de1b55";

  const [font, setFont] = useState("Times New Roman");
  const [fontColor, setFontColor] = useState(blue);
  const [hover, setHover] = useState(false);
  const [caption, setCaption] = useState("");

  const activeColorWrapperStyle = { border: "4px solid #B6CDFF" };

  const navigate = useHistory();

  const createStoryHandler = async () => {
    const story = {
      mediaType: "text",
      caption,
      font,
      fontColor:
        fontColor == "#0077ff"
          ? "blue"
          : fontColor == "#33b357"
          ? "green"
          : "pink",
      postedBy,
    };
    console.log("this is stroy", story, fontColor);
    const response = await createStory(story);
    if (response.status == 201) {
      onPrevHandler(); // reset the create story form to step 1
      navigate.push("/");
    }
  };
  return (
    <>
      {" "}
      <textarea
        placeholder="Caption"
        className={styles.caption}
        maxLength={200}
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        style={{ fontFamily: font, color: fontColor }}
      />
      <div className={styles.customizationMenuWrapper}>
        <div className={styles.selectWrapper}>
          <select value={font} onChange={(e) => setFont(e.target.value)}>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Cursive">Cursive</option>
            <option value="Monospace">Monospace</option>
          </select>
        </div>

        <div className={styles.paletteWrapper}>
          <div
            onClick={() => setFontColor(blue)}
            className={`${styles.colorPalette} ${styles.blue}`}
            style={fontColor == blue ? activeColorWrapperStyle : {}}
          />
          <div
            onClick={() => setFontColor(green)}
            className={`${styles.colorPalette} ${styles.green}`}
            style={fontColor == green ? activeColorWrapperStyle : {}}
          />
          <div
            onClick={() => setFontColor(pink)}
            className={`${styles.colorPalette} ${styles.pink}`}
            style={fontColor == pink ? activeColorWrapperStyle : {}}
          />
        </div>
      </div>
      <Button
        buttontitle="Post"
        buttonimage="party_popper"
        onClick={createStoryHandler}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ backgroundColor: hover ? "#1b8445" : "#20BD5F" }}
        disabled={caption == ""}
      />
    </>
  );
};

export default TextStory;

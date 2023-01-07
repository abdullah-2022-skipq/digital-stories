import React, { useState } from "react";
import styles from "./TextStory.module.css";

const TextStory = () => {
  const blueColor = "#0077ff";
  const greenColor = "#33b357";
  const pinkColor = "#de1b55";

  const [fontType, setFontType] = useState("Times New Roman");
  const [fontColor, setFontColor] = useState(blueColor);

  const activeColorWrapperStyle = { border: "4px solid #B6CDFF" };

  return (
    <>
      {" "}
      <textarea
        placeholder="Caption (placeholder)"
        className={styles.caption}
        maxLength={200}
        style={{ fontFamily: fontType, color: fontColor }}
      />
      <div className={styles.customizationMenuWrapper}>
        <div className={styles.selectWrapper}>
          <select
            value={fontType}
            onChange={(e) => setFontType(e.target.value)}
          >
            <option value="Times New Roman">Times New Roman</option>
            <option value="Cursive">Cursive</option>
            <option value="Monospace">Monospace</option>
          </select>
        </div>

        <div className={styles.paletteWrapper}>
          <div
            onClick={() => setFontColor(blueColor)}
            className={`${styles.colorPalette} ${styles.blue}`}
            style={fontColor == blueColor ? activeColorWrapperStyle : {}}
          />
          <div
            onClick={() => setFontColor(greenColor)}
            className={`${styles.colorPalette} ${styles.green}`}
            style={fontColor == greenColor ? activeColorWrapperStyle : {}}
          />
          <div
            onClick={() => setFontColor(pinkColor)}
            className={`${styles.colorPalette} ${styles.pink}`}
            style={fontColor == pinkColor ? activeColorWrapperStyle : {}}
          />
        </div>
      </div>
    </>
  );
};

export default TextStory;

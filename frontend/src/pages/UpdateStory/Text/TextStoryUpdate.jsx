import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetActiveRoute } from '../../../store/navbarSlice';
import styles from './TextStoryUpdate.module.css';
import Button from '../../../components/shared/Button/Button';
import { updateStory } from '../../../api';

function TextStoryUpdate({ prevFont, prevFontColor, prevCaption, storyId }) {
  const dispatch = useDispatch();

  const blue = '#0077ff';
  const green = '#33b357';
  const pink = '#de1b55';

  const prevFontColorMap =
    prevFontColor === 'blue' ? blue : prevFontColor === 'green' ? green : pink;

  const [font, setFont] = useState(prevFont);
  const [fontColor, setFontColor] = useState(prevFontColorMap);
  const [hover, setHover] = useState(false);
  const [caption, setCaption] = useState(prevCaption);

  const activeColorWrapperStyle = { border: '4px solid #B6CDFF' };

  const navigate = useHistory();

  const updateStoryHandler = async () => {
    const story = {
      mediaType: 'text',
      caption,
      font,
      fontColor:
        fontColor === '#0077ff' || fontColor === 'blue'
          ? 'blue'
          : fontColor === '#33b357' || fontColor === 'green'
          ? 'green'
          : 'pink',
      storyId,
    };

    const response = await updateStory(story);

    if (response.status === 200) {
      dispatch(resetActiveRoute());
      navigate.push('/');
    }
  };

  return (
    <>
      {' '}
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
            style={fontColor === blue ? activeColorWrapperStyle : {}}
          />

          <div
            onClick={() => setFontColor(green)}
            className={`${styles.colorPalette} ${styles.green}`}
            style={fontColor === green ? activeColorWrapperStyle : {}}
          />

          <div
            onClick={() => setFontColor(pink)}
            className={`${styles.colorPalette} ${styles.pink}`}
            style={fontColor === pink ? activeColorWrapperStyle : {}}
          />
        </div>
      </div>
      <Button
        buttontitle="Update"
        buttonimage="party_popper"
        onClick={updateStoryHandler}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ backgroundColor: hover ? '#1b8445' : '#20BD5F' }}
        disabled={
          caption === prevCaption &&
          font === prevFont &&
          fontColor === prevFontColor
        }
      />
    </>
  );
}

export default TextStoryUpdate;

/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styles from './Button.module.css';

function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className={styles.button}
      {...props}
      data-testid="button"
      type="button"
    >
      <span className={styles.buttonTitle}>{props.buttontitle}</span>
      <img
        className={styles.btnImg}
        src={`/images/${props.buttonimage}.png`}
        alt="button"
        data-testid="buttonImg"
      />
    </button>
  );
}

export default Button;

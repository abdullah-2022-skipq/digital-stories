import React from "react";
import styles from "./TextInput.module.css";

const TextInput = ({ type, placeholder }) => {
  return (
    <div>
      <input
        className={styles.textInput}
        type={type}
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export default TextInput;

import React from 'react';
import styles from './TextInput.module.css';

function TextInput(props) {
  return (
    <div>
      <input
        className={`${styles.textInput} ${
          props.error ? styles.formFieldErrorStyle : {}
        }`}
        type="text"
        {...props}
      />
      {props.error && (
        <p className={styles.fieldErrorMessage}>{props.errormessage}</p>
      )}
    </div>
  );
}

export default TextInput;

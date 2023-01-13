import React from 'react';
import styles from './TextInput.module.css';

function TextInput(props) {
  return (
    <div>
      <input
        className={`${styles.textInput} ${
          props.error ? styles.formFieldErrorStyle : {}
        }`}
        data-testid="input"
        type="text"
        {...props}
      />
      {props.error && (
        <p className={styles.fieldErrorMessage} data-testid="error">
          {props.errormessage}
        </p>
      )}
    </div>
  );
}

export default TextInput;

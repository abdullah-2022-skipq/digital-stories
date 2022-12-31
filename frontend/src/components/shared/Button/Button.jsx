import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button onClick={props.onClick} className={styles.button} {...props}>
      <span>{props.buttontitle}</span>
      <img
        className={styles.arrow}
        src="/images/arrow_right.png"
        alt="right arrow"
      />
    </button>
  );
};

export default Button;

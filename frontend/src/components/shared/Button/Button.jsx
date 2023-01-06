import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button onClick={props.onClick} className={styles.button} {...props}>
      <span>{props.buttonTitle}</span>
      <img
        className={styles.btnImg}
        src={`/images/${props.buttonImage}.png`}
        alt="right arrow"
      />
    </button>
  );
};

export default Button;

import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button onClick={props.onClick} className={styles.button} {...props}>
      <span>{props.buttontitle}</span>
      <img
        className={styles.btnImg}
        src={`/images/${props.buttonimage}.png`}
        alt="right arrow"
      />
    </button>
  );
};

export default Button;

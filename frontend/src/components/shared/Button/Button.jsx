import styles from "./Button.module.css";

const Button = ({ buttonTitle, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      <span>{buttonTitle}</span>
      <img
        className={styles.arrow}
        src="/images/arrow_right.png"
        alt="right arrow"
      />
    </button>
  );
};

export default Button;

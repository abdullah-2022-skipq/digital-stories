
import styles from "./Button.module.css";

interface ButtonProps {
    buttonTitle: String,
    
}

const Button = ({ buttonTitle } : ButtonProps) => {
  return (
    <button className={styles.button}>
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
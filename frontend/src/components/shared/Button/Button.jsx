import styles from './Button.module.css';

function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className={styles.button}
      {...props}
      data-testid="button"
    >
      <span className={styles.buttonTitle}>{props.buttontitle}</span>
      <img
        className={styles.btnImg}
        src={`/images/${props.buttonimage}.png`}
        alt="button-image"
        data-testid="buttonImg"
      />
    </button>
  );
}

export default Button;

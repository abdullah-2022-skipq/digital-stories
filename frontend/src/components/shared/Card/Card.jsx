import styles from "./Card.module.css";

const Card = ({ cardHeading, cardLogo, children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.headingWrapper}>
        {cardLogo && (
          <img
            className={styles.logoImg}
            src={`/images/${cardLogo}.png`}
            alt="waving hand"
          />
        )}
        {cardHeading && <h1 className={styles.heading}>{cardHeading}</h1>}
      </div>
      {children}
    </div>
  );
};

export default Card;

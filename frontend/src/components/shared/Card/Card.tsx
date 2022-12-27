import styles from "./Card.module.css";

type CardProps = {
  cardHeading: String, 
  cardLogo: String,
  children: React.ReactNode
}

const Card = ({ cardHeading, cardLogo, children } : CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.headingWrapper}>
        <img
          className={styles.logoImg}
          src={`/images/${cardLogo}.png`}
          alt="waving hand"
        />
        <h1 className={styles.heading}>{cardHeading}</h1>
      </div>
      {children}
    </div>
  );
};

export default Card;
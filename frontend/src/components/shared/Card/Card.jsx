import styles from './Card.module.css';

function Card({ cardHeading, cardLogo, children }) {
  return (
    <div
      className={styles.card}
      data-testid='card'
    >
      <div
        className={styles.headingWrapper}
        data-testid='headingWrapper'
      >
        {cardLogo && (
          <img
            className={styles.logoImg}
            src={`/images/${cardLogo}.png`}
            alt='card-logo'
            data-testid='cardLogo'
          />
        )}
        {cardHeading && <h1 className={styles.heading}>{cardHeading}</h1>}
      </div>
      {children}
    </div>
  );
}

export default Card;

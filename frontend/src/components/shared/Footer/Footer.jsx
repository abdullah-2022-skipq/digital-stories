import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.footer} container`}>
      Made with
      <img
        className={`${styles.footerEmoji} `}
        src="/images/heart.png"
        alt="heart"
      />
    </footer>
  );
};

export default Footer;
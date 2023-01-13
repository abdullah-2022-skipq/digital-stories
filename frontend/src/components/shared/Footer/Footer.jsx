import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={`${styles.footer} container`} data-testid="footer">
      Made with
      <img
        className={`${styles.footerEmoji} `}
        src="/images/heart.png"
        alt="heart"
      />
    </footer>
  );
}

export default Footer;

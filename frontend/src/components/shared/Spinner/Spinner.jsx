import React from "react";
import Card from "../Card/Card";
import styles from "./Spinner.module.css";

const Spinner = ({ message }) => {
  return (
    <div className="cardWrapper">
      <Card>
        <svg
          className={styles.spinner}
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          fill="none"
        >
          <circle cx="50" cy="50" r="45.5" stroke="#BEBCC0" strokeWidth="9" />
          <mask id="a" fill="#fff">
            <path d="M100 50a50 50 0 1 1-14.645-35.355L79.02 20.98A41.04 41.04 0 1 0 91.04 50H100Z" />
          </mask>
          <path
            stroke="#33B357"
            strokeWidth="18"
            d="M100 50a50 50 0 1 1-14.645-35.355L79.02 20.98A41.04 41.04 0 1 0 91.04 50H100Z"
            mask="url(#a)"
          />
        </svg>
        <span className={styles.message}>{message}</span>
      </Card>
    </div>
  );
};

export default Spinner;

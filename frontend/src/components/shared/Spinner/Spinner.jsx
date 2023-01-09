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
          width="138"
          height="138"
          fill="none"
        >
          <circle
            cx="69"
            cy="69"
            r="45.5"
            stroke="#BEBCC0"
            strokeWidth="9"
            transform="rotate(57.792 69 69)"
          />
          <mask id="a" fill="#fff">
            <path d="M95.65 111.306a50.004 50.004 0 0 1-62.944-7.915 49.999 49.999 0 1 1 85.053-23.32l-8.737-1.984A41.042 41.042 0 0 0 58.147 29.42a41.04 41.04 0 1 0 32.728 74.305l4.775 7.581Z" />
          </mask>
          <path
            stroke="#07F"
            strokeWidth="18"
            d="M95.65 111.306a50.004 50.004 0 0 1-62.944-7.915 49.999 49.999 0 1 1 85.053-23.32l-8.737-1.984A41.042 41.042 0 0 0 58.147 29.42a41.04 41.04 0 1 0 32.728 74.305l4.775 7.581Z"
            mask="url(#a)"
          />
        </svg>
        <span className={styles.message}>{message}</span>
      </Card>
    </div>
  );
};

export default Spinner;

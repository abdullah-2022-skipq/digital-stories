import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const logoStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  const logoText = {
    marginLeft: "10px",
  };

  const logoImg = {
    flexGrow: 0,
    flexShrink: 0,
  };

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={logoStyle} to="/">
        <img src="/images/waving_hand.png" alt="logo" />
        <span style={logoText}>Digital Stories</span>
      </Link>
    </nav>
  );
};

export default Navigation;

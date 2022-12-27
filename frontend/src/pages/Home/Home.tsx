import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";

const Home = () => {
  const signInStyle = {
    color: "#0077ff",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "10px",
  };
  return (
    <div className={styles.cardWrapper}>
      <Card cardHeading="Welcome" cardLogo="waving_hand">
        <p className={styles.description}>
        Digital Stories – the newest platform for sharing and discovering stories from around the world. We believe that everyone has something different to tell. <span className={styles.tagLine}> Snap your story now!</span>
        </p>
        
        <div>
          <Button buttonTitle="Let's Get Started" />
        </div>

        <div className={styles.hasInviteWrapper}>
          <span className={styles.hasInvite}>Have an account already?</span>
          <Link style={signInStyle} to="/login">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;
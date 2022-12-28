import { Link, useHistory } from "react-router-dom";
import styles from "./Home.module.css";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";
import { signInStyle } from "../../shared/styles";

const Home = () => {
  const history = useHistory();

  const getStartedHandler = () => {
    history.push("/get-started");
  };

  return (
    <div className="cardWrapper">
      <Card cardHeading="Welcome" cardLogo="waving_hand">
        <p className={styles.description}>
          Digital Stories – the newest platform for sharing and discovering
          stories from around the world.
          <span className={styles.tagLine}> Snap your story now!</span>
        </p>

        <div>
          <Button onClick={getStartedHandler} buttonTitle="Let's Get Started" />
        </div>

        <div className="hasInviteWrapper">
          <span className="hasInvite">Have an account already?</span>
          <Link style={signInStyle} to="/sign-in">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;

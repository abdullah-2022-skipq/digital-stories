import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './Landing.module.css';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';

function Landing() {
  const history = useHistory();

  const getStartedHandler = () => {
    history.push('/get-started');
  };

  const signInStyle = {
    color: '#0077ff',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginLeft: '10px',
  };

  return (
    <div className="cardWrapper" data-testid="cardWrapper">
      <Card cardHeading="Welcome" cardLogo="waving_hand">
        <p className={styles.description}>
          Digital Stories – the newest platform for sharing and discovering
          stories from around the world.
          <span className={styles.tagLine}> Snap your story now!</span>
        </p>

        <div data-id="button">
          <Button
            onClick={getStartedHandler}
            buttontitle="Let's Get Started"
            buttonimage="arrow_right"
          />
          <div
            className="hasAccountAlreadyWrapper"
            data-testid="hasAccountAlready"
          >
            <span className="hasAccountAlready">Have an account already?</span>
            <Link style={signInStyle} to="/sign-in">
              Sign in
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Landing;

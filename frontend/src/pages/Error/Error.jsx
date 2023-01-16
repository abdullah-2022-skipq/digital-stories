import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setActiveRoute } from '../../store/navbarSlice';
import Card from '../../components/shared/Card/Card';
import styles from './Error.module.css';

function Error() {
  const dispatch = useDispatch();

  const homeStyle = {
    color: '#0077ff',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginTop: '24px',
  };

  useEffect(() => {
    dispatch(setActiveRoute(''));
  }, []);

  return (
    <div className="cardWrapper">
      <Card cardLogo="error">
        <p className={styles.errorHeader}>404</p>
        <p>The page you are looking for does not exist</p>
        <Link style={homeStyle} to="/home">
          Go back to the home page
        </Link>
      </Card>
    </div>
  );
}

export default Error;

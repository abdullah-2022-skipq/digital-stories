import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import styles from './StepProfilePicture.module.css';
import { registerUser } from '../../../api';
import { setAuth } from '../../../store/authSlice';
import formStyles from '../MultiStepForm.module.css';
import { delStep } from '../../../store/multiStepFormSlice';
import { setAvatar } from '../../../store/userRegistrationSlice';
import { setUser } from '../../../store/userSlice';
import Spinner from '../../../components/shared/Spinner/Spinner';

function StepProfilePicture() {
  const [picture, setPicture] = useState(
    'http://localhost:5544/storage/default.png'
  );

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const dataFromStore = useSelector((state) => state.userRegistration);

  const onCreateAccountHandler = async () => {
    setLoading(true);
    const response = await registerUser(dataFromStore);
    if (response.status === 201) {
      dispatch(setAuth(response.data));
      dispatch(setUser(response.data));
    } else {
      setLoading(false);
      setError(response.response.data.message);
    }

    setLoading(false);
  };

  const getUserImage = (e) => {
    const imgFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onloadend = () => {
      setPicture(reader.result);
      dispatch(setAvatar(reader.result));
    };
  };

  const onClickBackHandler = () => {
    dispatch(delStep());
  };

  if (loading) return <Spinner message="Registering your account!" />;

  return (
    <div className="cardWrapper">
      <div>
        <button
          className={formStyles.backArrow}
          onClick={onClickBackHandler}
          type="button"
        >
          <img src="/images/arrow_back.png" alt="arrow back" />
        </button>

        <Card
          cardHeading={`Alright, ${dataFromStore.name}`}
          cardLogo="avatar_sign_up"
        >
          <div className={styles.cardFlex}>
            <p className={styles.avatarPromptHeading}>
              How’s this as your profile picture?
              <span className={styles.avatarLabelWrapper}>
                <input
                  className={styles.avatarSelection}
                  id="avatarSelection"
                  type="file"
                  accept="image/jpeg, image/jpg, image/png"
                  onChange={getUserImage}
                />
                <label className={styles.avatarLabel} htmlFor="avatarSelection">
                  Choose another photo
                </label>
              </span>
            </p>
            <div className={styles.avatarWrapper}>
              <img className={styles.avatarImage} src={picture} alt="avatar" />
            </div>
            <Button
              onClick={onCreateAccountHandler}
              buttontitle="Create Account"
              buttonimage="arrow_right"
            />
            {error !== '' && <div className={styles.errorWrapper}>{error}</div>}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default StepProfilePicture;

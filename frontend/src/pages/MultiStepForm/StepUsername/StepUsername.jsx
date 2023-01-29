import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../components/shared/Card/Card';
import TextInput from '../../../components/shared/TextInput/TextInput';
import Button from '../../../components/shared/Button/Button';
import { usernameSchema } from '../../../schemas';
import styles from './StepUsername.module.css';
import { setUsername } from '../../../store/userRegistrationSlice';
import { setStep, delStep } from '../../../store/multiStepFormSlice';
import formStyles from '../MultiStepForm.module.css';

function StepUsername() {
  const userName = useSelector((state) => state.userRegistration.username);
  console.log(userName);
  const { values, handleBlur, handleChange, errors, touched } = useFormik({
    initialValues: {
      username: userName,
    },
    validationSchema: usernameSchema,
  });

  const dispatch = useDispatch();

  const onClickNextHandler = () => {
    dispatch(setUsername(values.username));
    dispatch(setStep());
  };

  const onClickBackHandler = () => {
    dispatch(delStep());
  };

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
          cardHeading="What should we call you?"
          cardLogo="username_sign_up"
        >
          <div className={styles.textInputWrapper}>
            <TextInput
              type="text"
              placeholder="username"
              value={values.username}
              onChange={handleChange}
              name="username"
              onBlur={handleBlur}
              error={errors.username && touched.username ? 1 : undefined}
              errormessage={errors.username}
            />
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              onClick={onClickNextHandler}
              buttontitle="Next"
              buttonimage="arrow_right"
              disabled={!values.username || errors.username}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default StepUsername;

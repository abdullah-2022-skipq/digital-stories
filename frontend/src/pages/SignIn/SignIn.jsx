import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';
import TextInput from '../../components/shared/TextInput/TextInput';
import { signInSchema } from '../../schemas';
import { login } from '../../api';
import { setAuth } from '../../store/authSlice';
import { setUser } from '../../store/userSlice';
import styles from './SignIn.module.css';

function SignIn() {
  const { values, handleBlur, handleChange, errors, touched } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    validationSchema: signInSchema,
  });

  const dispatch = useDispatch();

  const [error, setError] = useState('');

  const loginHandler = async () => {
    const response = await login({
      username: values.username,
      password: values.password,
    });

    if (response.status === 200) {
      dispatch(setAuth(response.data));
      dispatch(setUser(response.data));
    } else if (response.code === 'ERR_BAD_REQUEST') {
      setError('username or password is wrong!');
    }
  };

  return (
    <div className="cardWrapper" data-testid="cardWrapper">
      <Card cardHeading="Welcome back" cardLogo="lock_key_sign_in">
        <div className="cardFlex" data-testid="cardFlex">
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

          <TextInput
            type="password"
            placeholder="password"
            value={values.password}
            onChange={handleChange}
            name="password"
            onBlur={handleBlur}
            error={errors.password && touched.password ? 1 : undefined}
            errormessage={errors.password}
          />
          <Button
            onClick={loginHandler}
            buttontitle="Sign In"
            buttonimage="arrow_right"
            disabled={
              !values.password ||
              !values.username ||
              errors.username ||
              errors.password
            }
          />
          {error !== '' && <div className={styles.errorWrapper}>{error}</div>}
        </div>
      </Card>
    </div>
  );
}

export default SignIn;

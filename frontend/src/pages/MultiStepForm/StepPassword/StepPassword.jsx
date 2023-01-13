import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import Card from '../../../components/shared/Card/Card';
import TextInput from '../../../components/shared/TextInput/TextInput';
import Button from '../../../components/shared/Button/Button';
import { passwordSchema } from '../../../schemas';
import { setPassword } from '../../../store/userRegistrationSlice';
import { setStep, delStep } from '../../../store/multiStepFormSlice';
import formStyles from '../MultiStepForm.module.css';

function StepPassword() {
  const { values, handleBlur, handleChange, errors, touched } = useFormik({
    initialValues: {
      password: 'myPassword1', // todo []
      confirmPassword: 'myPassword1',
    },

    validationSchema: passwordSchema,
  });

  const dispatch = useDispatch();

  const onClickNextHandler = () => {
    dispatch(setPassword(values.password));
    dispatch(setStep());
  };

  const onClickBackHandler = () => {
    dispatch(delStep());
  };

  return (
    <div className="cardWrapper">
      <div>
        <button className={formStyles.backArrow} type="button">
          <img
            src="/images/arrow_back.png"
            alt="arrow back"
            onClick={onClickBackHandler}
            role="button"
          />
        </button>

        <Card
          cardHeading="Almost there! Set a password"
          cardLogo="password_sign_up"
        >
          <div className="cardFlex">
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
            {/* <div className={styles.toolTip}>ToolTip</div> */}
            <TextInput
              type="password"
              placeholder="confirm password"
              value={values.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              onBlur={handleBlur}
              error={
                errors.confirmPassword && touched.confirmPassword
                  ? 1
                  : undefined
              }
              errormessage={errors.confirmPassword}
            />
            <Button
              onClick={onClickNextHandler}
              buttontitle="Next"
              buttonimage="arrow_right"
              disabled={
                !values.password ||
                !values.confirmPassword ||
                errors.password ||
                errors.confirmPassword
              }
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default StepPassword;

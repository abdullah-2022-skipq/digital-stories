import React from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";
import { useFormik } from "formik";
import { usernameSchema } from "../../../schemas";
import styles from "./StepUsername.module.css";
import { useDispatch } from "react-redux";
import { setUsername } from "../../../store/userRegistrationSlice";
import { setStep, delStep } from "../../../store/multiStepFormSlice";
import formStyles from "../MultiStepForm.module.css";

const StepUsername = () => {
  const { values, handleBlur, handleChange, errors, touched } = useFormik({
    initialValues: {
      username: "",
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
    <>
      <div className="cardWrapper">
        <div>
          <button className={formStyles.backArrow} onClick={onClickBackHandler}>
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
                value={values.name}
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
    </>
  );
};

export default StepUsername;

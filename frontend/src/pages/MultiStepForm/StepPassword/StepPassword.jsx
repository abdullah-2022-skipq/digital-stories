import React from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";
import { useFormik } from "formik";
import { passwordSchema } from "../../../schemas";
import { useDispatch } from "react-redux";
import { setPassword } from "../../../store/userRegistrationSlice";
import { setStep } from "../../../store/multiStepFormSlice";

const StepPassword = () => {
  const { values, handleBlur, handleChange, errors, touched } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validationSchema: passwordSchema,
  });

  const dispatch = useDispatch();

  const onClickNextHandler = () => {
    dispatch(setPassword(values.password));
    dispatch(setStep());
  };

  return (
    <>
      <div className="cardWrapper">
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
    </>
  );
};

export default StepPassword;

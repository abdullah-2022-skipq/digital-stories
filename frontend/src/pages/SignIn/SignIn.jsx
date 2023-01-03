import React from "react";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";
import TextInput from "../../components/shared/TextInput/TextInput";
import { signInSchema } from "../../schemas";
import { useFormik } from "formik";
import { login } from "../../api";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";

const SignIn = ({}) => {
  const { values, handleBlur, handleChange, errors, touched } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: signInSchema,
  });

  const dispatch = useDispatch();

  const loginHandler = async () => {
    const response = await login({
      username: values.username,
      password: values.password,
    });
    if (response.status == 200) {
      dispatch(setAuth(response.data.auth));
    }
  };
  return (
    <>
      <div className="cardWrapper">
        <Card cardHeading="Welcome back" cardLogo="lock_key_sign_in">
          <div className="cardFlex">
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
              disabled={
                !values.password ||
                !values.username ||
                errors.username ||
                errors.password
              }
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default SignIn;

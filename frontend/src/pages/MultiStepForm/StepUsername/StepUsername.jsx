import React from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";
import { useFormik } from "formik";
import { usernameSchema } from "../../../../schemas";

const StepUsername = ({ onNext }) => {
  const { values, handleBlur, handleChange, errors, touched } = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: usernameSchema,
  });

  return (
    <>
      <div className="cardWrapper">
        <Card
          cardHeading="What should we call you?"
          cardLogo="username_sign_up"
        >
          <div className="cardFlex">
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
            <Button
              onClick={onNext}
              buttontitle="Next"
              disabled={!values.username || errors.username}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepUsername;

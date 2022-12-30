import React from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";
import { useFormik } from "formik";
import { contactDetailsSchema } from "../../../../schemas";

const StepContactDetails = ({ onNext }) => {
  const { values, handleBlur, handleChange, errors, touched } = useFormik({
    // handleBlur will validate the field once its out of focus
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: contactDetailsSchema,
  });

  return (
    <>
      <div className="cardWrapper">
        <Card
          cardHeading="Let’s get your contact details"
          cardLogo="contact_details_sign_up"
        >
          <div className="cardFlex">
            <TextInput
              type="text"
              placeholder="name"
              value={values.name}
              onChange={handleChange}
              name="name"
              onBlur={handleBlur}
              error={errors.name && touched.name ? 1 : undefined}
              errormessage={errors.name}
            />

            <TextInput
              type="email"
              placeholder="email"
              value={values.email}
              onChange={handleChange}
              name="email"
              onBlur={handleBlur}
              error={errors.email && touched.email ? 1 : undefined}
              errormessage={errors.email}
            />
            <Button
              onClick={onNext}
              buttonTitle="Next"
              disabled={
                !values.email || !values.email || errors.email || errors.name
              }
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepContactDetails;

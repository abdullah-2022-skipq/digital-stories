import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../components/shared/Card/Card';
import TextInput from '../../../components/shared/TextInput/TextInput';
import Button from '../../../components/shared/Button/Button';
import { contactDetailsSchema } from '../../../schemas';
import { setName, setEmail } from '../../../store/userRegistrationSlice';
import { setStep } from '../../../store/multiStepFormSlice';

function StepContactDetails() {
  const nameGlobal = useSelector((state) => state.userRegistration.name);
  const emailGlobal = useSelector((state) => state.userRegistration.email);

  const { values, handleBlur, handleChange, errors, touched } = useFormik({
    // handleBlur will validate the field once its out of focus
    initialValues: {
      name: nameGlobal,
      email: emailGlobal,
    },
    validationSchema: contactDetailsSchema,
  });

  const dispatch = useDispatch();

  const onClickNextHandler = () => {
    dispatch(setName(values.name));
    dispatch(setEmail(values.email));
    dispatch(setStep());
  };

  return (
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
            onClick={onClickNextHandler}
            buttontitle="Next"
            buttonimage="arrow_right"
            disabled={
              !values.email || !values.email || errors.email || errors.name
            }
          />
        </div>
      </Card>
    </div>
  );
}

export default StepContactDetails;

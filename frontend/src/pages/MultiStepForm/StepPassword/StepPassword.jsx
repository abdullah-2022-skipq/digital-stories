import React from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";

const StepPassword = ({ onNext }) => {
  return (
    <>
      <div className="cardWrapper">
        <Card
          cardHeading="Almost there! Set a password"
          cardLogo="password_sign_up"
        >
          <div className="cardFlex">
            <TextInput type="password" placeholder="password" />
            <TextInput type="password" placeholder="confirm password" />

            <Button onClick={onNext} buttonTitle="Next" />
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepPassword;

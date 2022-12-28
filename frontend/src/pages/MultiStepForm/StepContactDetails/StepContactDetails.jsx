import React from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";

const StepContactDetails = ({ onNext }) => {
  return (
    <>
      <div className="cardWrapper">
        <Card
          cardHeading="Let’s get your contact details"
          cardLogo="contact_details_sign_up"
        >
          <div className="cardFlex">
            <TextInput type="text" placeholder="name" />
            <TextInput type="email" placeholder="email" />
            <Button onClick={onNext} buttonTitle="Next" />
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepContactDetails;

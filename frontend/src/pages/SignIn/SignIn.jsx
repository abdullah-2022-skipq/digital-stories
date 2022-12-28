import React from "react";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";
import TextInput from "../../components/shared/TextInput/TextInput";

const SignIn = ({}) => {
  return (
    <>
      <div className="cardWrapper">
        <Card cardHeading="Welcome back" cardLogo="lock_key_sign_in">
          <div className="cardFlex">
            <TextInput type="text" placeholder="username" />
            <TextInput type="password" placeholder="password" />
            <Button onClick={() => {}} buttonTitle="Sign In" />
          </div>
        </Card>
      </div>
    </>
  );
};

export default SignIn;

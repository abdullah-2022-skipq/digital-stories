import React from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepUsername.module.css";

const StepUsername = ({ onNext }) => {
  return (
    <>
      <div className="cardWrapper">
        <Card
          cardHeading="What should we call you?"
          cardLogo="username_sign_up"
        >
          <div className={`cardFlex ${styles.cardF}`}>
            <TextInput type="text" placeholder="username" />
            <div className={styles.button}>
              <Button onClick={onNext} buttonTitle="Next" />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepUsername;

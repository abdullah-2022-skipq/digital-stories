import React from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepProfilePicture.module.css";

const StepProfilePicture = ({ onNext }) => {
  return (
    <>
      <div className="cardWrapper">
        <Card cardHeading="Alright, useSelector" cardLogo="avatar_sign_up">
          <div className="cardFlex">
            <p className={styles.avatarPromptHeading}>
              How’s this as your profile picture?
              <div className={styles.avatarLabelWrapper}>
                <input
                  className={styles.avatarSelection}
                  id="avatarSelection"
                  type="file"
                />
                <label className={styles.avatarLabel} htmlFor="avatarSelection">
                  Choose another photo
                </label>
              </div>
            </p>
            <div className={styles.avatarWrapper}>
              <img
                className={styles.avatarImage}
                src="/images/avatar.png"
                alt="avatar"
              />
            </div>
            <Button onClick={onNext} buttonTitle="Create Account" />
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepProfilePicture;

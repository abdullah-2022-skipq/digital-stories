import React from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepProfilePicture.module.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../api";
import { setAuth } from "../../../store/authSlice";
import formStyles from "../MultiStepForm.module.css";
import { delStep } from "../../../store/multiStepFormSlice";

const StepProfilePicture = () => {
  const dispatch = useDispatch();

  const dataFromStore = useSelector((state) => state.userRegistration);

  const onCreateAccountHandler = async () => {
    const response = await registerUser(dataFromStore);
    // console.log(response);
    if (response != undefined) dispatch(setAuth());
  };

  const onClickBackHandler = () => {
    dispatch(delStep());
  };

  return (
    <>
      <div className="cardWrapper">
        <div>
          <button className={formStyles.backArrow} onClick={onClickBackHandler}>
            <img src="/images/arrow_back.png" alt="arrow back" />
          </button>

          <Card
            cardHeading={`Alright, ${dataFromStore.name}`}
            cardLogo="avatar_sign_up"
          >
            <div className={styles.cardFlex}>
              <p className={styles.avatarPromptHeading}>
                How’s this as your profile picture?
                <span className={styles.avatarLabelWrapper}>
                  <input
                    className={styles.avatarSelection}
                    id="avatarSelection"
                    type="file"
                  />
                  <label
                    className={styles.avatarLabel}
                    htmlFor="avatarSelection"
                  >
                    Choose another photo
                  </label>
                </span>
              </p>
              <div className={styles.avatarWrapper}>
                <img
                  className={styles.avatarImage}
                  src="/images/avatar.png"
                  alt="avatar"
                />
              </div>
              <Button
                onClick={onCreateAccountHandler}
                buttontitle="Create Account"
              />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default StepProfilePicture;

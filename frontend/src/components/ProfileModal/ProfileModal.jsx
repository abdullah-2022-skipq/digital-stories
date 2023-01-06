import React, { useState } from "react";
import styles from "./ProfileModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/shared/Button/Button";
import { logout } from "../../api";
import { setAuth } from "../../store/authSlice";

const ProfileModal = ({ closeModalHandler }) => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const signOutHandler = async () => {
    const response = await logout();
    dispatch(setAuth(response.data));
    closeModalHandler();
  };

  const [hover, setHover] = useState(false);

  return (
    <>
      <div className={styles.modalMask}>
        <div className={styles.modalBody}>
          <button onClick={closeModalHandler} className={styles.closeButton}>
            <img src="/images/close.png" alt="close" />
          </button>
          <div className={styles.modalContent}>
            <img className={styles.avatar} src={user.avatar} alt="avatar" />
            <h3 className={styles.name}>{user.name}</h3>
            <h5 className={styles.username}>@{user.username}</h5>
            <span className={styles.memberSince}>
              You've been a part of our community since:
              <strong>{user.memberSince}</strong>
              <img src="/images/party_popper.png" alt="party popper" />
            </span>
            <div className={styles.signOutButton}>
              <Button
                buttontitle="Sign Out"
                onClick={signOutHandler}
                buttonimage="sign_out"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{ backgroundColor: hover ? "#af1543" : "#DE1B55" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;

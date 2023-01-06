import React from "react";
import styles from "./ProfileModal.module.css";

const ProfileModal = () => {
  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <div className={styles.modalHeader}>
          <h3>ABOUT YOU</h3>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../api";
import { setAuth } from "../../../store/authSlice";

const Navigation = () => {
  const logoStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  const logoText = {
    marginLeft: "10px",
  };

  const logoImg = {
    flexGrow: 0,
    flexShrink: 0,
  };

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const response = await logout();
    dispatch(setAuth(response.data));
  };

  const { isAuth } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={logoStyle} to="/">
        {/* <img style={logoImg} src="/images/navbar_snap.png" alt="logo" /> */}
        <span style={logoText}>Digital Stories</span>
      </Link>

      {isAuth && (
        <div className={styles.navRight}>
          <Link to="/">
            <img
              className={styles.avatar}
              src={user.avatar}
              alt="avatar"
              width={30}
              height={30}
            />
          </Link>
          <button className={styles.logoutButton} onClick={logoutHandler}>
            <img src="/images/log_out.png" alt="logout" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

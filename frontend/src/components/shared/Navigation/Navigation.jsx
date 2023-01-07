import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { useState } from "react";
import ProfileModal from "../../ProfileModal/ProfileModal";
import { useSelector, useDispatch } from "react-redux";
import { setActiveRoute } from "../../../store/navbarSlice";

const Navigation = () => {
  const logoStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  const navElementStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
  };

  const logoText = {
    marginLeft: "10px",
  };

  const navElementText = {
    marginLeft: "5px",
  };

  const active = useSelector((state) => state.navbar.activeRoute);

  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const showModalHandler = () => {
    setModal(true);
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  const { isAuth } = useSelector((state) => state.auth);

  const user = useSelector((state) => state.user);

  const activeRouteHandler = (route) => {
    dispatch(setActiveRoute(route));
  };

  const activeRouteStyle = "3px solid #0077ff";

  return (
    <>
      <nav className={`${styles.navbar} container`}>
        <Link
          style={logoStyle}
          to="/"
          onClick={() => activeRouteHandler("home")}
        >
          <span style={logoText}>Digital Stories</span>
        </Link>

        {isAuth && (
          <Link
            style={navElementStyle}
            to="/home"
            onClick={() => activeRouteHandler("home")}
          >
            <span
              style={{
                ...navElementText,
                borderBottom: active == "home" ? activeRouteStyle : "",
              }}
            >
              Home
            </span>
          </Link>
        )}

        {isAuth && (
          <Link
            style={navElementStyle}
            to="/trending"
            onClick={() => activeRouteHandler("trending")}
          >
            <span
              style={{
                ...navElementText,
                borderBottom: active == "trending" ? activeRouteStyle : "",
              }}
            >
              Trending
            </span>
          </Link>
        )}

        {isAuth && (
          <Link
            style={navElementStyle}
            to="/leaderboard"
            onClick={() => activeRouteHandler("leaderboard")}
          >
            <span
              style={{
                ...navElementText,
                borderBottom: active == "leaderboard" ? activeRouteStyle : "",
              }}
            >
              Leaderboard
            </span>
          </Link>
        )}

        {isAuth && (
          <Link
            style={navElementStyle}
            to="/engagements"
            onClick={() => activeRouteHandler("engagements")}
          >
            <span
              style={{
                ...navElementText,
                borderBottom: active == "engagements" ? activeRouteStyle : "",
              }}
            >
              Engagements
            </span>
          </Link>
        )}

        {isAuth && (
          <div className={styles.navRight}>
            <button className={styles.avatarWrapper} onClick={showModalHandler}>
              <img className={styles.avatar} src={user.avatar} alt="avatar" />
            </button>
          </div>
        )}
      </nav>
      {modal && <ProfileModal closeModalHandler={closeModalHandler} />}
    </>
  );
};

export default Navigation;

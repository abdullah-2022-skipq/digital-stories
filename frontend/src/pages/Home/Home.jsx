import React from "react";
import { getCurrentUser, logout } from "../../api";
import { setAuth } from "../../store/authSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const testClick = async () => {
    const response = await getCurrentUser();
    // console.log(response);
  };

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const response = await logout();
    // console.log(response);
    dispatch(setAuth(response.data.auth));
  };

  return (
    <>
      <div>Home Page - home to all the stories</div>
      <button onClick={testClick}>press me</button>
      <button onClick={logoutHandler}>Log Out</button>
    </>
  );
};

export default Home;

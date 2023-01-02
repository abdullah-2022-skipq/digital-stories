import React from "react";
import { getCurrentUser } from "../../api";

const Home = () => {
  const testClick = async () => {
    const response = await getCurrentUser();
    console.log(response);
  };
  return (
    <>
      <div>Home Page - home to all the stories</div>
      <button onClick={testClick}>press me</button>
    </>
  );
};

export default Home;

import React from "react";
import { useLocation } from "react-router-dom";

const Story = () => {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <div>Story</div>
      <div>{location.state.caption}</div>
    </>
  );
};

export default Story;

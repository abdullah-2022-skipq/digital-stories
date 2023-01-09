import React from "react";

const ImageStoryCard = ({ caption, image }) => {
  return (
    <>
      <div>
        <img src={image} alt="story-image" />
        <p>{caption}</p>
      </div>
    </>
  );
};

export default ImageStoryCard;

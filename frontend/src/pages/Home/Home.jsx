import { Link } from "react-router-dom";
import React, { useState } from "react";
import styles from "./Home.module.css";
import { mockData } from "./mock-data";
import StoryCard from "../../components/shared/StoryCard/StoryCard";
import StepChooseMediaType from "../MultiStepCreateStoryForm/StepChooseMediaType/StepChooseMediaType";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className={styles.storiesHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>All stories</span>

            <div className={styles.searchBox}>
              {/* Search icon by Icons8 */}
              <img src="/images/search.png" alt="search" />

              <input className={styles.searchInput} type="text" />
            </div>
          </div>

          <div className={styles.right}>
            <Link to="/create-story" style={{ textDecoration: "none" }}>
              <button className={styles.createStoryButton}>
                <img src="/images/create_story.png" alt="create story" />

                <span>Create a story</span>
              </button>
            </Link>
          </div>
        </div>

        <div className={styles.storyGrid}>
          {mockData.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

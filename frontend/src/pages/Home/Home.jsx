import { Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import styles from "./Home.module.css";
import StoryCard from "../../components/shared/StoryCard/StoryCard";
import Spinner from "../../components/shared/Spinner/Spinner";
import { getAllStories } from "../../api";

const Home = () => {
  useEffect(() => {
    (async () => {
      const response = await getAllStories();

      // dirty fix
      let dataFromApi = response.data.stories;
      let targetData = [];

      dataFromApi.forEach((story) => {
        let postedBy = story.postedBy;
        delete story.postedBy;

        const postedBySource = { ...postedBy };
        let postedByCleaned = {};

        for (let key in postedBySource) {
          if (postedBySource.hasOwnProperty(key)) {
            postedByCleaned["postedBy_" + key] = postedBySource[key];
          }
        }

        const parsedData = { ...story, ...postedByCleaned };
        targetData.push(parsedData);
      });

      setData(targetData);
      setDataMask(targetData);
      return;
    })();
  }, []);

  const [data, setData] = useState(null);
  const [dataMask, setDataMask] = useState(null);

  const inputRef = useRef(null);

  const onSearchHandler = () => {
    const searchQuery = inputRef.current.value;

    if (searchQuery == "") {
      setDataMask(data);
    }

    const filteredData = data.filter((story) =>
      story.caption.includes(searchQuery)
    );

    setDataMask(filteredData);
  };

  if (!data) {
    return <Spinner message="Loading stories, please wait" />;
  }

  return (
    <>
      <div className="container">
        <div className={styles.storiesHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>All stories</span>

            <div className={styles.searchBox}>
              {/* Search icon by Icons8 */}
              <img src="/images/search.png" alt="search" />
              <input
                className={styles.searchInput}
                type="text"
                ref={inputRef}
                onChange={() =>
                  inputRef.current.value == "" ? setDataMask(data) : ""
                }
              />
            </div>
            <button className={styles.searchButton} onClick={onSearchHandler}>
              Search
            </button>
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
          {dataMask.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

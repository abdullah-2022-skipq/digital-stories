import React, { useEffect, useState } from "react";
import { getTrendingStories } from "../../api";
import Spinner from "../../components/shared/Spinner/Spinner";
import StoryCard from "../../components/shared/StoryCard/StoryCard";
import styles from "./Trending.module.css";

const Trending = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getTrendingStories();

      let dataFromApi = response.data.stories;

      setData(dataFromApi);

      return;
    })();
  }, []);

  if (!data) return <Spinner message="Loading trending stories, please wait" />;

  return (
    <>
      <div className="container">
        <div className={styles.storyGrid}>
          {data.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Trending;

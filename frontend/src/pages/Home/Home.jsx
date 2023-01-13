import { Link } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import styles from './Home.module.css';
import StoryCard from '../../components/shared/StoryCard/StoryCard';
import Spinner from '../../components/shared/Spinner/Spinner';
import { getAllStories } from '../../api';

function Home() {
  useEffect(() => {
    (async () => {
      const response = await getAllStories();

      const dataFromApi = response.data.stories;

      setData(dataFromApi);
      setDataMask(dataFromApi);
    })();
  }, []);

  const [data, setData] = useState(null);
  const [dataMask, setDataMask] = useState(null);

  const [activeView, setActiveView] = useState('grid');

  const inputRef = useRef(null);

  const onSearchHandler = () => {
    let searchQuery = inputRef.current.value;

    if (searchQuery === '') {
      setDataMask(data);
    }

    searchQuery = searchQuery.toLowerCase();

    const filteredData = data.filter((story) =>
      story.caption.toLowerCase().includes(searchQuery)
    );

    setDataMask(filteredData);
  };

  if (!data) {
    return <Spinner message="Loading stories, please wait" />;
  }

  return (
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
                inputRef.current.value === '' ? setDataMask(data) : ''
              }
              onKeyDown={(e) => (e.key === 'Enter' ? onSearchHandler() : '')}
            />
          </div>
          <button className={styles.searchButton} onClick={onSearchHandler}>
            Search
          </button>
        </div>

        <div className={styles.right}>
          <Link to="/create-story" style={{ textDecoration: 'none' }}>
            <button className={styles.createStoryButton}>
              <img src="/images/create_story.png" alt="create story" />

              <span>Create a story</span>
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.storyCustomization}>
        <img
          className={activeView === 'grid' ? styles.activeView : ''}
          src="/images/grid.png"
          alt="grid"
          role="button"
          onClick={() => setActiveView('grid')}
        />
        <img
          className={activeView === 'list' ? styles.activeView : ''}
          src="/images/list.png"
          alt="list"
          role="buttton"
          onClick={() => setActiveView('list')}
        />
      </div>
      <div
        className={activeView === 'grid' ? styles.storyGrid : styles.storyList}
      >
        {dataMask.map((story) => (
          <StoryCard
            key={story._id}
            story={story}
            grid={activeView === 'grid'}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

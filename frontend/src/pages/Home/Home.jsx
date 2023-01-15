import { Link } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import styles from './Home.module.css';
import StoryCard from '../../components/shared/StoryCard/StoryCard';
import Spinner from '../../components/shared/Spinner/Spinner';
import { getAllStories } from '../../api';

function Home() {
  const [data, setData] = useState(null);
  const [dataMask, setDataMask] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getAllStories();

      const dataFromApi = response.data.stories;

      setData(dataFromApi);
      setDataMask(dataFromApi);
    })();
  }, []);

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

  // eslint-disable-next-line no-unused-vars
  const [sortBy, setSortBy] = useState('date');

  const sortData = (by) => {
    if (by === 'date') {
      const sortedData = dataMask.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setDataMask(sortedData);
    } else if (by === 'upvotes') {
      const sortedData = dataMask.sort((a, b) => b.upVotes - a.upVotes);
      setDataMask(sortedData);
    } else if (by === 'downvotes') {
      const sortedData = dataMask.sort((a, b) => b.downVotes - a.downVotes);
      setDataMask(sortedData);
    }
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    sortData(event.target.value);
  };

  if (!data) {
    return <Spinner message="Loading stories, please wait" />;
  }

  return (
    <div className="container">
      <div className={styles.storiesHeader}>
        <div className={styles.left}>
          <div className={styles.searchBox}>
            {/* Search icon by Icons8 */}
            <img src="/images/search.png" alt="search" />
            <input
              className={styles.searchInput}
              placeholder="search"
              type="text"
              ref={inputRef}
              onChange={() =>
                inputRef.current.value === '' ? setDataMask(data) : ''
              }
              onKeyDown={(e) => (e.key === 'Enter' ? onSearchHandler() : '')}
            />
          </div>
          <button
            className={styles.searchButton}
            onClick={onSearchHandler}
            type="button"
          >
            Search
          </button>
        </div>

        <div className={styles.right}>
          <Link to="/create-story" style={{ textDecoration: 'none' }}>
            <button className={styles.createStoryButton} type="button">
              <img src="/images/create_story.png" alt="create story" />

              <span>Create a story</span>
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.storyCustomization}>
        <div className={styles.selectWrapper}>
          <select onChange={handleSortByChange}>
            <option value="date">Sort by date</option>
            <option value="upvotes">Sort by upvotes</option>
            <option value="downvotes">Sort by downvotes</option>
          </select>
        </div>

        <img
          className={activeView === 'grid' ? styles.activeView : ''}
          src="/images/grid.png"
          alt="grid"
          role="button"
          onClick={() => setActiveView('grid')}
          title="View as grid"
        />

        <img
          className={activeView === 'list' ? styles.activeView : ''}
          src="/images/list.png"
          alt="list"
          role="button"
          onClick={() => setActiveView('list')}
          title="View as list"
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

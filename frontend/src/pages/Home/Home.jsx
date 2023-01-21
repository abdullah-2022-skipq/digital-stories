import { Link } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import styles from './Home.module.css';
import StoryCard from '../../components/shared/StoryCard/StoryCard';
import Spinner from '../../components/shared/Spinner/Spinner';
import { getAllStories } from '../../api';

function Home() {
  const [data, setData] = useState(null);
  const [dataMask, setDataMask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, sethasNextPage] = useState(true);
  const [hasPrevPage, sethasPrevPage] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getAllStories(currentPage);

      const dataFromApi = response.data.stories;

      sethasNextPage(response.data.hasNextPage);
      sethasPrevPage(response.data.hasPrevPage);

      setData(dataFromApi);
      setDataMask(dataFromApi);
    })();
  }, [currentPage]);

  // pagination
  const onPreviousPageHandler = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const onNextPageHandler = () => {
    setCurrentPage(currentPage + 1);
  };

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

  const handleSortByChange = (value) => {
    setSortBy(value);
    sortData(value);
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
        <div className={styles.sortByHeader}>
          <p>Sort By</p>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.groupButton} ${
                sortBy === 'date' ? styles.sortByActive : ''
              }`}
              type="button"
              onClick={() => {
                handleSortByChange('date');
              }}
            >
              Date
            </button>
            <button
              className={`${styles.groupButton} ${
                sortBy === 'upvotes' ? styles.sortByActive : ''
              }`}
              type="button"
              onClick={() => {
                handleSortByChange('upvotes');
              }}
            >
              Upvotes
            </button>
            <button
              className={`${styles.groupButton} ${
                sortBy === 'downvotes' ? styles.sortByActive : ''
              }`}
              type="button"
              onClick={() => {
                handleSortByChange('downvotes');
              }}
            >
              Downvotes
            </button>
          </div>
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
      <div className={styles.paginationWrapper}>
        <button
          type="button"
          onClick={onPreviousPageHandler}
          disabled={!hasPrevPage}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={onNextPageHandler}
          disabled={!hasNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './MyStories.module.css';
import StoryCard from '../../components/shared/StoryCard/StoryCard';
import Spinner from '../../components/shared/Spinner/Spinner';
import { getMyStories } from '../../api';

function MyStories() {
  const [data, setData] = useState(null);
  const [dataMask, setDataMask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, sethasNextPage] = useState(true);
  const [hasPrevPage, sethasPrevPage] = useState(false);
  const userId = useSelector((state) => state.user._id);

  useEffect(() => {
    (async () => {
      const response = await getMyStories(currentPage, userId);

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
    return <Spinner message="Loading your stories, please wait" />;
  }

  return (
    <div className="container">
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
      </div>
      <div className={styles.storyList}>
        {dataMask.map((story) => (
          <StoryCard key={story._id} story={story} grid={false} />
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

export default MyStories;

import React from 'react';
import styles from './CommentList.module.css';
import Comment from '../Comment/Comment';

function CommentList({ comments }) {
  return (
    <div className={styles.commentListWrapper}>
      <div className={styles.commentList}>
        {comments.length === 0 ? (
          <div className={styles.noComments}>No comments yet</div>
        ) : (
          comments.map((comment, i) => <Comment key={i} comment={comment} />)
        )}
      </div>
    </div>
  );
}

export default CommentList;

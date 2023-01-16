import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveRoute } from '../../store/navbarSlice';

function Error() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveRoute(''));
  }, []);

  return <div>404 - Not Found. Go to Home</div>;
}

export default Error;

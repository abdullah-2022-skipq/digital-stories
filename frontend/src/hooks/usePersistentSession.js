import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
import { setUser } from "../store/userSlice";

export const usePersistentSession = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.VITE_REACT_APP_API_PATH}/api/refresh`,
          { withCredentials: true }
        );

        dispatch(setAuth(response.data));
        dispatch(setUser(response.data));
      } catch (error) {
        //
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { loading };
};

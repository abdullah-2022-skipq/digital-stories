import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";

export const usePersistentSession = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_PATH}/api/refresh`,
          { withCredentials: true }
        );

        dispatch(setAuth(response.data.auth));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { loading };
};

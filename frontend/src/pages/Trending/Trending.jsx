import React, { useEffect, useState } from "react";
import { getTrendingStories } from "../../api";

const Trending = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getTrendingStories();
      console.log(response);
      let dataFromApi = response.data.stories;

      setData(dataFromApi);

      return;
    })();
  }, []);
  return (
    <>
      <div>Trending</div>
      <div>{data}</div>
    </>
  );
};

export default Trending;

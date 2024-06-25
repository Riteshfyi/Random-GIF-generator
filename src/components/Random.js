import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const Random = () => {
  const [gif, setGif] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

    try {
      const output = await axios.get(url);
      setLoading(true);
      console.log(output.data.data.images.downsized_large.url === gif);
      setGif(output.data.data.images.downsized_large.url);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function clickHandler() {
    fetchData();
  }

  return (
    <div className="min-w-1/2 bg-green-500 border px-10 border-black flex flex-col items-center gap-y-5 mt-[15px]">
      <h1 className="text-2xl underline uppercase font-bold mt-[15px]">
        Random GIF
      </h1>

      {loading ? <Spinner /> : <img src={gif} width="450" />}

      <button
        onClick={clickHandler}
        className="w-9/12 bg-green-50 rounded-md text-lg py-2 mb-[20px]"
      >
        Generate
      </button>
    </div>
  );
};

export default Random;

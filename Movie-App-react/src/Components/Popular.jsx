import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../Utils/axios";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";

const Popular = () => {
  const apiKey = "fb18734469bf95929a3796758a14bb14";
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const GetPopular = async () => {
    try {
      console.log(`Fetching page ${page} for category ${category}`);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${apiKey}`
      );

      console.log("Fetched data:", data);

      if (data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
        console.log("No more data to fetch.");
      }
    } catch (error) {
      console.error("Error fetching popular data:", error);
      setHasMore(false);
    }
  };

  const refreshHandler = async () => {
    setPage(1);
    setPopular([]);
    setHasMore(true);
    await GetPopular();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="p-[1%] w-full h-screen overflow-hidden overflow-y-auto">
      {/* Top navigation bar */}
      <div className="flex w-full items-center">
        <h1 className="text-3xl font-bold text-white px-10">
          <i
            onClick={() => navigate(-1)}
            className="text-[#6556CD] ri-arrow-left-line"
          ></i>
          Popular
        </h1>
        <Topnav />
        <Dropdown
          title={"Category"}
          options={["movie", "tv"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>

      {/* Infinite scroll for popular movies list */}
      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more data</p>}
      >
        <Cards data={popular} />
      </InfiniteScroll>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default Popular;

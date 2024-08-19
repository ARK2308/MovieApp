import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../Utils/axios";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";

const TVShows = () => {
  const apiKey = "fb18734469bf95929a3796758a14bb14";
  const [category, setCategory] = useState("airing_today");
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const GetTVShows = async () => {
    try {
      console.log(`Fetching page ${page} for category ${category}`);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/airing_today?page=${page}&api_key=${apiKey}`
      );

      console.log("Fetched data:", data);

      if (data.results.length > 0) {
        setShows((prevState) => [...prevState, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
        console.log("No more data to fetch.");
      }
    } catch (error) {
      console.error("Error fetching TV show data:", error);
      setHasMore(false);
    }
  };

  const refreshHandler = async () => {
    setPage(1);
    setShows([]);
    setHasMore(true);
    await GetTVShows();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return shows.length > 0 ? (
    <div className="p-[1%] w-full h-screen overflow-hidden overflow-y-auto">
      {/* Top navigation bar */}
      <div className="flex w-full items-center">
        <h1 className="text-3xl font-bold text-white px-10">
          <i
            onClick={() => navigate(-1)}
            className="text-[#6556CD] ri-arrow-left-line"
          ></i>
          TV Shows <small className="text-[#6556CD] text-xs">{category}</small>
        </h1>
        <Topnav />
        <Dropdown
          title={"Category"}
          options={["airing_today", "on_the_air", "popular", "top_rated"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>

      {/* Infinite scroll for TV shows list */}
      <InfiniteScroll
        dataLength={shows.length}
        next={GetTVShows}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more data</p>}
      >
        <Cards data={shows} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default TVShows;

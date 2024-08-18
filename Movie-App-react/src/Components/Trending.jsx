import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../Utils/axios";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const apiKey = "fb18734469bf95929a3796758a14bb14";
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
 

  const GetTrending = async () => {
    try {
      console.log(
        `Fetching page ${page} for category ${category} and duration ${duration}`
      );
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/${category}/${duration}?page=${page}&api_key=${apiKey}`
      );

      console.log("Fetched data:", data);

      if (data.results.length > 0) {
        // Append new data to the existing trending state
        setTrending((prevState) => [...prevState, ...data.results]);
        // Increment the page number
        setPage((prevPage) => prevPage + 1);
      } else {
        // No more data available
        setHasMore(false);
        console.log("No more data to fetch.");
      }
    } catch (error) {
      console.error("Error fetching trending data:", error);
      setHasMore(false); // Stop further requests on error
    }
  };

  const refreshHandler = async () => {
    setPage(1); // Reset page to 1
    setTrending([]); // Clear the previous results
    setHasMore(true); // Reset the hasMore flag
    await GetTrending(); // Fetch new data
  };

  // Ensure this runs when the page or category changes
  useEffect(() => {
    setPage(1); // Reset page to 1 whenever category or duration changes
    setTrending([]); // Clear current trending data
    setHasMore(true); // Reset hasMore to true
    GetTrending(); // Fetch initial data
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="p-[1%] w-full h-screen overflow-hidden overflow-y-auto">
      {/* Top navigation bar */}
      <div className="flex w-full items-center">
        <h1 className="text-3xl font-bold text-white px-10">
          <i
            onClick={() => navigate(-1)}
            className="text-[#6556CD] ri-arrow-left-line"
          ></i>
          Trending
        </h1>
        <Topnav />

        <Dropdown
          title={"Category"}
          options={["all", "movie", "tv"]}
          func={(e) => setCategory(e.target.value)}
        />
        <div className="w-[2%]"></div>
        <Dropdown
          title={"Duration"}
          options={["week", "day"]}
          func={(e) => setDuration(e.target.value)}
        />
      </div>

      {/* Infinite scroll for trending movies list */}
      <InfiniteScroll
        dataLength={trending.length} // Length of the currently loaded data
        next={GetTrending} // Function to fetch more data
        hasMore={hasMore} // Boolean to determine whether more data can be loaded
        loader={<h4>Loading...</h4>} // Displayed while fetching more data
        endMessage={<p>No more data</p>} // Message displayed when all data is loaded
      >
        <Cards data={trending} />
      </InfiniteScroll>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default Trending;

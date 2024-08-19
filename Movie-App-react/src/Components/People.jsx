// People.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../Utils/axios";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";

const People = () => {
  const apiKey = "fb18734469bf95929a3796758a14bb14";
  const [category, setCategory] = useState("popular");
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const GetPeople = async () => {
    try {
      console.log(`Fetching page ${page} for category ${category}`);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${category}?page=${page}&api_key=${apiKey}`
      );

      console.log("Fetched data:", data);

      if (data.results.length > 0) {
        setPeople((prevState) => [...prevState, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
        console.log("No more data to fetch.");
      }
    } catch (error) {
      console.error("Error fetching people data:", error);
      setHasMore(false);
    }
  };

  const refreshHandler = async () => {
    setPage(1);
    setPeople([]);
    setHasMore(true);
    await GetPeople();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return people.length > 0 ? (
    <div className="p-[1%] w-full h-screen overflow-hidden overflow-y-auto">
      <div className="flex w-full items-center">
        <h1 className="text-3xl font-bold text-white px-10">
          <i
            onClick={() => navigate(-1)}
            className=" mx-2 text-[#6556CD] ri-arrow-left-line"
          ></i>
          Peoples
        </h1>
        <Topnav />
    
      </div>

      <InfiniteScroll
        dataLength={people.length}
        next={GetPeople}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more data</p>}
      >
        <Cards data={people} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default People;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../Utils/axios";
import Cards from "./partials/Cards";

const Trending = () => {
    const apiKey = 'fb18734469bf95929a3796758a14bb14';
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState(null);
  const navigate = useNavigate();

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/${category}/${duration}?api_key=${apiKey}`
      );
      setTrending(data.results);
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };
  console.log(trending);

  useEffect(() => {
    GetTrending();
  }, [category, duration]);

  return trending ? (
    <div className=" p-[1%] w-full h-screen overflow-hidden overflow-y-auto">
      {/* for the top nav bar of trending
       */}
      <div className="flex w-full  items-center  ">
        <h1 className="text-3xl font-bold text-white px-10">
          <i
            onClick={() => navigate(-1)}
            className=" text-[#6556CD] ri-arrow-left-line"
          ></i>
          Trending
        </h1>
        <Topnav />

        <Dropdown title={"Category"} options={["all", "movie", "tv"]} func={(e)=> setCategory(e.target.value)} />
        <div className="w-[2%]"></div>
        <Dropdown title={"Duration"} options={["week", "Day"]} func={(e)=> setDuration(e.target.value)} />
      </div>

      {/* for header compnents of the trending*/}

      {/* trending moies list  */}
      <Cards data={trending} />
    </div>
  ) : <h1>Loading</h1>
};

export default Trending;

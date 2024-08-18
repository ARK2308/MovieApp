import { useState, useEffect } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../Utils/axios";
import Header from "./partials/Header";
import HorizontalsCards from "./partials/HorizontalsCards";
import Dropdown from "./partials/Dropdown";

const Home = () => {
  document.title = "FlixNet | HomePage";
  const apiKey = 'fb18734469bf95929a3796758a14bb14';

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
      );
      let randomdata = data.results[
        Math.floor(Math.random() * data.results.length)
      ];
      setWallpaper(randomdata);
    } catch (error) {
      console.error("Error fetching wallpaper:", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/${category}/day?api_key=${apiKey}`
      );
      setTrending(data.results);
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };

  useEffect(() => {
    GetHeaderWallpaper();
    GetTrending();
  }, [category]);

  return wallpaper && trending.length ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-screen overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <div className="p-5 flex justify-between">
          <h1 className="text-zinc-400 font-bold text-4xl">TRENDING</h1>
          <Dropdown
            title="Filter"
            options={["all", "movie", "tv", "person"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
        <HorizontalsCards data={trending} />
      </div>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};

export default Home;

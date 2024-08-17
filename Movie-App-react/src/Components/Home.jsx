import { useState, useEffect } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../Utils/axios";
import Header from "./partials/Header";

const Home = () => {
  document.title = "FlixNet | HomePage";

  const [wallpaper, setWallpaper] = useState(null);
  const apiKey = 'fb18734469bf95929a3796758a14bb14';

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
      );
      let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randomdata);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (!wallpaper) {
      GetHeaderWallpaper();
    }
  }, []);

  return wallpaper ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-screen">
        <Topnav />
        <Header data={wallpaper} />
      </div>
    </>
  ) : <h1>Loading...</h1>;
};

export default Home;

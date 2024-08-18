import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-500 ">
      <h1 className="text-3xl text-white font-bold  rounded-lg p-5">
        <i class=" mx-4  text-[#6556CD] ri-movie-2-fill mr-2"></i>
        <span className="text-2xl mt-3 ">FNM</span>
      </h1>

      {/* Sidebar Nav section */}

      <nav className="flex flex-col text-zinc-400 text-xl gap-3 ">
        <h1 className="text-white mx-6 text-xl fomt-semibold mt-4 mx-10 ">
          New Feeds
        </h1>
        <Link to="/trending" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3 mx-12 mt-2 text-sm">
          <i class="ri-fire-fill"></i> Trending
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3 mx-12 mt-2 text-sm">
          <i class=" mr-1 ri-bard-fill"></i> Popular
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3 mx-12 mt-2 text-sm">
          <i class=" mr-1 ri-movie-2-fill"></i> Movies
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3 mx-12 mt-2 text-sm">
          <i class=" mr-1 ri-tv-2-fill"></i> Tv Shows
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3 mx-12 mt-2 text-sm">
          <i class=" mr-1 ri-group-fill"></i> Peoples
        </Link>
      </nav>
      <hr className="border-none bg-zinc-500 h-[1px] mt-3" />
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white mx-6 text-xl fomt-semibold mt-2 ">
          Website Information
        </h1>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3 mx-12 mt-2 text-sm">
          <i class=" mr-1 ri-information-2-fill"></i> About
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3 mx-12 mt-2 text-sm">
          <i class=" mr-1 ri-phone-fill"></i>Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;

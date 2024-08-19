import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      // for the header image that cones in the background
      style={{
        background: `linear-gradient(rgba(0,0,0,.1), rgba(0,0,0,.4), rgba(0,0,0,.7) ), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundSize: "cover", // Added to ensure the background image covers the area
        backgroundPosition: "center", // Center the background image
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[70vh] flex flex-col justify-end   items-start  p-[4%]  "
    >
      {/* for the movie title */}

      <h1 className=" w-[70%] text-4xl text-white font-black opacity-90 mr-5  ">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>

      {/* for the movie overview */}

      <p className="text-zinc-200 text-sm w-[70%] mt-2 ">
        {data.overview.slice(0, 200)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">more</Link>
      </p>

      {/* for the movie details */}
      <p className="text-zinc-200">
        <i class=" text-yellow-500 ri-calendar-2-fill"></i> {""} {data.release_date || data.first_air_date}
        <i class=" ml-5 text-yellow-500 ri-movie-2-fill"></i>{" "}
        {data.media_type.toUpperCase()}
      </p>

      {/* for the trailer */}
      <Link className="text-white bg-[#6556CD] p-3 rounded-lg mt-3 font-semibold hover:text-[#6556CD] hover:bg-white duration-500 "> Watch Trailer</Link>
    </div>
  );
};

export default Header;

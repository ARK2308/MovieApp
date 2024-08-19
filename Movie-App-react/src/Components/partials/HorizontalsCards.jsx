import React from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";

const HorizontalsCards = ({ data }) => {
  return (
   
     
      <div className="w-full flex overflow-x-auto shadow-2xl rounded-lg">
        {data.map((d, i) => (
          <Link to={`/${d.media_type}/details/${d.id}`} key={i} className="min-w-[35%] mr-5 ">
            <div className="w-full h-[70%] mb-2">
              <img
                className="w-full h-full object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original${
                  d.backdrop_path || d.poster_path
                }`}
                alt={d.name || d.title || d.original_name || d.original_title}
              />
            </div>

            <h1 className="text-2xl text-white font-semibold opacity-90">
              {d.name || d.title || d.original_name || d.original_title}
            </h1>

            {/* for the movie overview */}
            <p className="text-zinc-200">
              <i class="  text-yellow-500 ri-movie-2-fill"></i>{" "}
              {d.media_type.toUpperCase()}
            </p>
          </Link>          
        ))}
      
      </div>
   
  );
};

export default HorizontalsCards;

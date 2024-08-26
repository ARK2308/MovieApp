import axios from "../../Utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/public/noimage.jpg";


const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const apiKey = 'fb18734469bf95929a3796758a14bb14'; // Replace with your actual TMDb API key

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/multi?query=${query}&api_key=${apiKey}`
      );
      setSearches(data.results || []);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (query) {
      GetSearches();
    } else {
      setSearches([]); // Clear results if query is empty
    }
  }, [query]);

  const handleClear = () => {
    setQuery(""); // Clear the search box
    setSearches([]); // Clear the search results
  };

  return (
    <div className="w-full h-[10vh] relative flex items-center justify-center">
      <i className="hover:text-white duration-300 text-zinc-400 text-2xl ri-search-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="hover:text-white duration-300 w-[50%] text-zinc-200 mx-10 p-2 text-xl outline-none border-none bg-transparent rounded-lg"
        type="text"
        placeholder="Search movies"
      />
      {query.length > 0 && (
        <i
          onClick={handleClear}
          className="hover:text-white duration-300 text-zinc-400 text-2xl ri-close-line"
        ></i>
      )}

      {searches.length > 0 && (
        <div className="  z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[90%] rounded-md overflow-auto">
          {searches.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="text-xl hover:text-white duration-300 hover:bg-zinc-800 bg-zinc-400 w-[100%] p-5 flex justify-start items-center border-b-2 border-zinc-600"
            >
              <img 
              className="w-[10vh] h-[10vh] rounded object-cover shadow-lg mr-5" 
              src= {
                s.backdrop_path ||
                 s.profile_path ?  `https://image.tmdb.org/t/p/original/${s.backdrop_path
                    || s.profile_path 
                 }` : noimage
                }
               alt="" />

              {/* for the seath title */}
              <span>{s.name || s.title || s.original_name || s.original_title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topnav;

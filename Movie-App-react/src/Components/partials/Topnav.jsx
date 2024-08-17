import React, { useState } from "react";
import { Link } from "react-router-dom";

const Topnav = () => {
   const [query, setQuery]= useState("")
   console.log(query)
  return (
    <div className="w-full h-[10vh]  relative flex items-center justify-center ">
      <i class=" hover:text-white duration-300 text-zinc-400 text-2xl ri-search-line"></i>
      <input
        onChange={(e)=>setQuery(e.target.value)}
        value={query}
        className=" hover:text-white duration-300  w-[50%] text-zinc-200 mx-10 p-2 text-xl outline-none border-none bg-zinc-800 rounded-lg"
        type="text"
        placeholder="Search movies"
      />
     {query.length > 0 && (
 <i onClick={()=>setQuery("")} class=" hover:text-white duration-300 text-zinc-400 text-2xl ri-close-line"></i>
     )} 
     

      <div className="absolute w-[50%] max-h-[50vh] bg-zinc-200  top-[90%] rounded-md overflow-auto">
        {/* <Link className=" text-xl hover:text-white duration-300 hover:bg-zinc-800 bg-zinc-400 w-[100%] p-5 flex justify-start items-center border-b-2 border-zinc-600">
          <img src="" alt="" />
          <span>Hello Everone</span>
        </Link>
     */}
      </div>
    </div>
  );
};

export default Topnav;

import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Trailer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvedios = useSelector((state) => state[category].info.videos);
  return (
    <div className="bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0 w-screen h-[140vh] flex justify-center items-center">
      <Link
        onClick={() => navigate(-1)}
        className=" absolute top-8 right-[12%] hover:text-[#6556CD] ri-close-fill text-4xl">
      </Link>
      <ReactPlayer
        height={500}
        width={1000}
        className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2"
        url={`https://www.youtube.com/watch?v=${ytvedios.key}`} />
    </div>
  );
};

export default Trailer;

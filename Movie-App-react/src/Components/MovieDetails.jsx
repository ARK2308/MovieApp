import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadmovie } from "../store/actions/movieActions";
import { removemovie } from "../store/reducers/movieSlice";
import HorizontalsCards from "./partials/HorizontalsCards";
import Cards from "./partials/Cards";
import Trailer from "./partials/Trailer";

const MovieDetails = () => {
 const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.movie);
  console.log(info); // Corrected to log 'info'

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [dispatch, id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.6), rgba(0,0,0,.8) ), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.7)",
        
      }}
      className="w-screen h-[140vh] px-[10%] py-[1%] text-white overflow-y-auto shadow-lg"
    >
      {/* part1 navigation */}
      <nav className=" h-[10vh] w-full flex items-center gap-10">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line text-2xl"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          className="px-3 py-1 bg-yellow-400 rounded-md text-black"
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          IMDB
        </a>
      </nav>

      {/* part2 poster and details */}
      <div className="w-full  flex text-white">
        <img
          className="card-image w-[28%] mt-5 h-[52vh] w-full object-cover rounded-lg opacity-100"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt="Movie Poster"
        />

        <div className="content h-[50vh] mx-10 mt-2">
          <h1 className="text-5xl font-bold text-zinc-100 flex items-center mt-2">
            {info.detail.title || info.detail.name || info.detail.original_name}

            <small className="text-2xl text-zinc-200 mx-2 mt-3">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>

          <div className="flex items-center gap-6 text-white mt-2">

          <span className=" rounded-full text-xl font-semibold bg-yellow-600 text-white w-[7vh] h-[7vh] flex justify-center items-center mt-2">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1 className="text-xl mr-2  flex items-center leading-10">User Score</h1>
            <h1 >{info.detail.release_date}</h1>
            <h1>{info.detail.runtime} min</h1>
            <h1>
              {info.detail.genres.map((g) =>g. name).join(",")}
              </h1>
        
          </div>
          <h1 className="text-xl  font-semibold italic mt-2">{info.detail.tagline}</h1>
          <h1 className="text-3xl font-semibold   mt-1">Overview</h1>
          <p className="mb-6">{info.detail.overview}</p>

          <Link
  to={`${pathname}/trailer`}
  className="text-white bg-[#6556CD] p-3 rounded-lg font-semibold hover:text-[#6556CD] hover:bg-white duration-500"
>
  <i className="ri-play-fill mx-2"></i>Play Trailer
</Link>

        
           
        </div>
      </div>

      {/* part 3 available on rent or buy */}

      <div className="mt-3">
        {info.watchProviders &&
          info.watchProviders.flatrate &&
          info.watchProviders.flatrate.map((w, index) => (
            <img
              key={index}
              className="w-[5vh] object-cover rounded-md"
              src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              alt={`${w.provider_name}`}
            />
          ))}
        {info.watchProviders &&
          info.watchProviders.rent &&
          info.watchProviders.rent.map((w, index) => (
            <img
              key={index}
              className="w-[5vh] object-cover rounded-md"
              src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              alt={`${w.provider_name}`}
            />
          ))}
      </div>

      {/* part 4 similar movies */}
      <div className="mt-[5%]">
        <h1 className="text-4xl font-semibold text-white mb-5 flex justify-start w-full h-[8vh] bg-zinc-900 p-2 rounded-md">Similar Movies</h1>
      <HorizontalsCards
       data={info.recommendations.length > 0 ? info.recommendations: info.similar } />
       </div>
       <Outlet />
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default MovieDetails;

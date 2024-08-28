import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadperson } from "../store/actions/personActions";
import { removeperson } from "../store/reducers/personSlice";
import Dropdown from "./partials/Dropdown";

const sliceBiography = (biography, maxWords) => {
  const words = biography.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return biography;
};

const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.person);

  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);

  if (!info) {
    return <h1>Loading...</h1>;
  }

  const credits = info[`${category}Credits`] && info[`${category}Credits`].cast ? info[`${category}Credits`].cast : [];

  return (
    <div className="px-[15%] w-screen h-screen overflow-y-auto">
      <nav className="h-[10vh] w-full flex items-center gap-10">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] text-white ri-arrow-left-line text-2xl"
        ></Link>
      </nav>

      <div className="w-full flex">
        <div className="w-[25%]">
          <img
            className="card-image mt-5 h-[46vh] w-full object-cover rounded-lg shadow-lg opacity-100"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt="Person Poster"
          />
          <hr className="mt-5 border-none h-[2px] bg-zinc-600" />

          <div className="w-full mt-3 flex justify-center gap-10 text-white text-2xl">
            {info.externalid.facebook_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.facebook.com/${info.externalid.facebook_id}`}
              >
                <i className="ri-facebook-fill hover:text-[#6556CD] duration-300"></i>
              </a>
            )}
            {info.externalid.instagram_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.instagram.com/${info.externalid.instagram_id}`}
              >
                <i className="ri-instagram-fill hover:text-[#6556CD] duration-300"></i>
              </a>
            )}
            {info.externalid.wikidata_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
              >
                <i className="ri-earth-fill hover:text-[#6556CD] duration-300"></i>
              </a>
            )}
            {info.externalid.twitter_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://twitter.com/${info.externalid.twitter_id}`}
              >
                <i className="ri-twitter-fill"></i>
              </a>
            )}
          </div>
          <hr className="mt-2 border-none h-[2px] bg-zinc-600" />

          <h1 className="text-2xl hover:text-[#6556CD] duration-300 text-zinc-300 font-semibold opacity-90 my-5">
            Personal Information
          </h1>

          <table className="w-full text-zinc-400">
            <tbody>
              <tr className="border-t border-zinc-600">
                <td className="py-2 font-semibold hover:text-[#6556CD] duration-300">
                  Known For
                </td>
                <td className="hover:text-[#6556CD] duration-300">
                  {info.detail.known_for_department}
                </td>
              </tr>
              <tr className="border-t border-zinc-600">
                <td className="py-2 font-semibold hover:text-[#6556CD] duration-300">
                  Gender
                </td>
                <td className="hover:text-[#6556CD] duration-300">
                  {info.detail.gender === 1 ? "Female" : "Male"}
                </td>
              </tr>
              <tr className="border-t border-zinc-600">
                <td className="py-2 font-semibold hover:text-[#6556CD] duration-300">
                  Birthday
                </td>
                <td className="hover:text-[#6556CD] duration-300">
                  {info.detail.birthday}
                </td>
              </tr>
              <tr className="border-t border-zinc-600">
                <td className="py-2 font-semibold hover:text-[#6556CD] duration-300">
                  Death Day
                </td>
                <td className="hover:text-[#6556CD] duration-300">
                  {info.detail.deathday ? info.detail.deathday : "Still Alive"}
                </td>
              </tr>
              <tr className="border-t border-zinc-600">
                <td className="py-2 font-semibold hover:text-[#6556CD] duration-300">
                  Place of Birth
                </td>
                <td className="hover:text-[#6556CD] duration-300">
                  {info.detail.place_of_birth}
                </td>
              </tr>
              <tr className="border-t border-zinc-600">
                <td className="py-2 font-semibold hover:text-[#6556CD] duration-300">
                  Also Known As
                </td>
                <td className="hover:text-[#6556CD] duration-300">
                  {info.detail.also_known_as.join(",")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="w-[75%] text-white pl-10">
          <h1 className="hover:text-[#6556CD] duration-300 text-4xl font-bold mt-3">
            {info.detail.name}
          </h1>
          <h1 className="hover:text-[#6556CD] duration-300 text-2xl font-semibold mt-3">
            Biography
          </h1>
          <p className="text-xm text-zinc-300 mt-1">
            {info.detail.biography
              ? sliceBiography(info.detail.biography, 200)
              : "No biography available."}{" "}
            <Link className="text-[#6556CD]">Read More</Link>
          </p>

          <hr className="mt-4 border-none h-[2px] bg-zinc-600" />
          <div className="flex justify-between w-full">
            <h1 className="font-semibold text-2xl hover:text-[#6556CD] duration-300 text-zinc-300 mt-2">
              Acting
            </h1>
            <Dropdown
              className="mt-5 text-zinc-300"
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="mt-[10%] w-full h-[50vh] overflow-x-hidden shadow-lg shadow-[rgba(0,0,7,0.9)] border-2 border-zinc-700 p-2">
            {credits.length > 0 ? (
              credits.map((c, i) => (
                <li key={i} className="hover:text-[#6556CD] duration-300 cursor-pointer">
                  <Link to={`/${category}/details/${c.id}`} className="">
                    <span>{c.title || c.name || c.original_name || c.original_title}</span>
                  </Link>
                </li>
              ))
            ) : (
              <p>No credits available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;

import axios from "../../Utils/axios"; // Ensure this is correctly configured
import { loadmovie } from "../reducers/movieSlice";

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  const apiKey = "fb18734469bf95929a3796758a14bb14";

  try {
    const detail = await axios.get(`/movie/${id}?api_key=${apiKey}`);
    const externalid = await axios.get(`/movie/${id}/external_ids?api_key=${apiKey}`);
    const recommendations = await axios.get(`/movie/${id}/recommendations?api_key=${apiKey}`);
    const similar = await axios.get(`/movie/${id}/similar?api_key=${apiKey}`);
    const videos = await axios.get(`/movie/${id}/videos?api_key=${apiKey}`);
    const watchProviders = await axios.get(`/movie/${id}/watch/providers?api_key=${apiKey}`);
    const translations = await axios.get(`/movie/${id}/translations?api_key=${apiKey}`);

    const theUltimateDetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find(m => m.type === "Trailer") || null, // Handle the case where no trailer is 
      watchProviders: watchProviders.data.IN || {}, // Assuming you want to get providers for India (IN)
    };

    dispatch(loadmovie(theUltimateDetails));
    console.log(theUltimateDetails);
  } catch (error) {
    console.log("Error fetching movie data:", error);
    // Optionally, dispatch an error action here
  }
};

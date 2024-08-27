import axios from "../../Utils/axios"; // Ensure this is correctly configured
import { loadtv } from "../reducers/tvSlice";

export const asyncloadtv = (id) => async (dispatch, getState) => {
  const apiKey = "fb18734469bf95929a3796758a14bb14";

  try {
    const detail = await axios.get(`/tv/${id}?api_key=${apiKey}`);
    const externalid = await axios.get(`/tv/${id}/external_ids?api_key=${apiKey}`);
    const recommendations = await axios.get(`/tv/${id}/recommendations?api_key=${apiKey}`);
    const similar = await axios.get(`/tv/${id}/similar?api_key=${apiKey}`);
    const videos = await axios.get(`/tv/${id}/videos?api_key=${apiKey}`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers?api_key=${apiKey}`);
    const translations = await axios.get(`/tv/${id}/translations?api_key=${apiKey}`);

    const theUltimateDetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find(m => m.type === "Trailer") || null, // Handle the case where no trailer is 
      watchProviders: watchProviders.data.IN || {}, // Assuming you want to get providers for India (IN)
    };

    dispatch(loadtv(theUltimateDetails));
    console.log(theUltimateDetails);
  } catch (error) {
    console.log("Error fetching movie data:", error);
    // Optionally, dispatch an error action here
  }
};

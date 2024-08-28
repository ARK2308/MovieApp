import axios from "../../Utils/axios"; // Ensure this is correctly configured
import { loadperson } from "../reducers/personSlice";

export const asyncloadperson = (id) => async (dispatch, getState) => {
  const apiKey = "fb18734469bf95929a3796758a14bb14";
  
  try {
    const detail = await axios.get(`/person/${id}?api_key=${apiKey}`);
    const externalid = await axios.get(`/person/${id}/external_ids?api_key=${apiKey}`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits?api_key=${apiKey}`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits?api_key=${apiKey}`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits?api_key=${apiKey}`);
   

    const theUltimateDetails = {
      detail: detail.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data.cast, 
      tvCredits: tvCredits.data.cast,
      movieCredits: movieCredits.data.cast, // Assuming you want to get the cast credits
     
    };

    dispatch(loadperson(theUltimateDetails));
    console.log(theUltimateDetails);
  } catch (error) {
    console.log("Error fetching person data:", error);
    // Optionally, dispatch an error action here
  }
};

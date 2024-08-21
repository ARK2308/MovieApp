import axios from "../../Utils/axios"; // Assuming axios is configured with a base URL

export const asyncloadmovie = (id) => async (dispatch) => {
  const apiKey = "fb18734469bf95929a3796758a14bb14";

  try {
    const detail = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
    const externalid = await axios.get(`https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${apiKey}`);
    const recommendations = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`);
    const similar = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`);
    const videos = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`);
    const watchProvide = await axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`);

    const theUltimateDetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data,
      similar: similar.data,
      videos: videos.data,
      watchProvide: watchProvide.data,
    };

    dispatch(loadMovie(theUltimateDetails));
    console.log(theUltimateDetails);
  } catch (error) {
    console.log("Error fetching movie data:", error);
  }
};

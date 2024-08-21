import axios from "axios";



const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer fb18734469bf95929a3796758a14bb14'
      }
});


export default instance


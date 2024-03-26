import { api } from "./api";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const movieByGenreBaseURL = `discover/movie?api_key=${API_KEY}`;

export const getTrendingVideos = async () => {
  try {
    const response = await api.get(`/trending/all/day?api_key=${API_KEY}`);
    return response.data;
  } catch (err) {
    console.log("🚀 ~ getTrendingVideos ~ err:", err);
    throw err;
  }
};

export const getMovieByGenreId = async (id: number | string) => {
  try {
    const response = await api.get(movieByGenreBaseURL + "&with_genres=" + id);
    return response.data;
  } catch (err) {
    console.log("🚀 ~ getTrendingVideos ~ err:", err);
    throw err;
  }
};

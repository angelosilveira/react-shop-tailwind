import { api } from "./api";

export const getAllProducts = async () => {
  try {
    const response = await api.get(`/products`);
    return response.data;
  } catch (err) {
    console.log("🚀 ~ getTrendingVideos ~ err:", err);
    throw err;
  }
};

export const getProduct = async (id: number) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (err) {
    console.log("🚀 ~ getTrendingVideos ~ err:", err);
    throw err;
  }
};

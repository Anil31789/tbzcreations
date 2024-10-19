import axios from "axios";

const api = axios.create({
  baseURL: "https://api.pujakaitem.com/api",
});
export const allProducts = () => api.get("/products");

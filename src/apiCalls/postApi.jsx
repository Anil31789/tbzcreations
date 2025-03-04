import axios from "axios";


const api = axios.create({
  baseURL: " http://localhost:3000/api/",
});
export const allProducts = (filter) => {
  try{
    return  api.get(`get-products?catalogid=${filter.catelogID}&search=${filter.search ? filter.search : ''}&categoryids=${filter.categoryIds}&limit=1000`);
  }
  catch(er){
    console.log(err);
  }
}
export default api
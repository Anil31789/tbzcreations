import { setCategory } from "../Store/categorySlice";
import api from "./postApi";


export const categoryData =(catelogID)=> async (dispatch,getState)=>{
    try {
            const {data} = await api(`get-category?catalogid=${catelogID}`)
             const categoryArr = data.results.map(category => ({...category,selected: false}));
             const category = {
                counts: data.counts,
                results: categoryArr
             }
            dispatch(setCategory(category))
    } catch (error) {
        dispatch(setCategory(error))
            console.log(error);
    }
}

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    category: {},
    loader: true

}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers:{
        setCategory: (state,action)=>{
            state.category = action.payload
            state.loader = false
        },
        setSelectCategory: (state,action)=>{
            if(action.payload === undefined){
                state.category = {counts:state.category.counts, results: state.category.results.map(category => ({...category,selected: false}))}
            }
            else{
                let newarr = state.category.results.map(category => category.id !==action.payload ? category : {...category,selected: !category.selected})
                state.category = {counts:state.category.counts , results: newarr}
            }
        }

    }
})


export default categorySlice;
export const {setCategory,setSelectCategory} = categorySlice.actions
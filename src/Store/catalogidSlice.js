import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    catelogID : ''
}

const catelogidSlice = createSlice({
    name: 'catelogID',
    initialState,
    reducers:{
        getCatelogID: (state,action)=>{
            state.catelogID = action.payload
            
        }
    }
})

export default catelogidSlice;
export const {getCatelogID} = catelogidSlice.actions
import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import catelogidSlice from "./catalogidSlice";

export const store = configureStore({
    reducer: {
        category: categorySlice.reducer,
        catelogID: catelogidSlice.reducer
    }
})

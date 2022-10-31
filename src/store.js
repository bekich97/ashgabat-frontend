import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./stores/mainSlice";

export default configureStore({
    reducer: {
        mainSlice: mainSlice,
    },
})
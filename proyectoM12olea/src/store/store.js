import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "./homeSlice";
import favoriteSlice from "./favorites/favoriteSlice";
import commentSlice from "../pages/Comments/commentSlice";

export const store = configureStore({
    reducer: {
        home: homeSlice,
        favorite: favoriteSlice,
        comments: commentSlice
    },
});
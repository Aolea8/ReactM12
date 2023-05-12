import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "./homeSlice";
import favoriteSlice from "./favorites/favoriteSlice";

export const store = configureStore({
    reducer: {
        home: homeSlice,
        favorite: favoriteSlice
    },
});
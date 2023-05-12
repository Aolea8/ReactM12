import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorito: false,
}
export const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        setFavorito: (state,action) => { 
            state.favorito = action.payload;
        }
    }
});

export const { setFavorito } = favoriteSlice.actions;

export default favoriteSlice.reducer
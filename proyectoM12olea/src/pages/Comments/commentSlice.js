import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    comments: [],
    page: 1,
    isLoading: false,
    add: true,
    error: "",
    commentsCount : 0,
    pages: [],
}
export const commentSlice = createSlice({

    name: "comment",
    initialState,
    reducers: {
        startLoadingComments: (state) => {
            state.isLoading = true;
        },
        setComments: (state, action ) => {
          state.comments= action.payload
          state.isLoading=false
        },
        setAdd: (state,action) =>  {
            state.add = action.payload
        },
        setError: (state,action) => { 
            state.error = action.payload
        },
        setCommentsCount: (state,action) => {
            state.commentsCount = action.payload
        },
        setPage: (state,action) => {
            state.page = action.payload
        },
        setPages: (state,action) => {
            state.pages = action.payload
        },
    }
});
    
export const { startLoadingComments,setComments,setAdd,setError,setCommentsCount, setPage, setPages } = commentSlice.actions;

export default commentSlice.reducer
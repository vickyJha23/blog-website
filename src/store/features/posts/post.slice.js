import { createSlice } from "@reduxjs/toolkit";
import { createPostThunk, getAllPostsThunk } from "./post.thunk";


const postSlice = createSlice({
    name: "post",
    initialState: {
         posts: [],
         isLoading: false,
         error: null
    },
    reducers: {},
    extraReducers: (builder) => {
         
         // create post
        builder.addCase(createPostThunk.pending, (state) => {
              state.isLoading = true;
         })         
         builder.addCase(createPostThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload;
         })
         builder.addCase(createPostThunk.rejected,(state, action) => {
                state.isLoading = false,
                state.posts = [],
                state.error = action.payload?.message || action.error.message 
         })

         // get all posts
         builder.addCase(getAllPostsThunk.pending, (state) => {
               state.isLoading = true;
         })
         builder.addCase(getAllPostsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload;
         })
         builder.addCase(getAllPostsThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.posts = [];
                state.error = action.payload?.message || action.error.message;
         })

    }
})


export default postSlice.reducer;


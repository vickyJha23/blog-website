import { createSlice } from "@reduxjs/toolkit";
import { createPostThunk, getAllPostsThunk, getUserPostThunk } from "./post.thunk";


const postSlice = createSlice({
    name: "posts",
    initialState: {
         posts: [],
         post: {},
         userPost: [],
         isLoading: false,
         error: null
    },
    reducers: {
        addPostsToStore: (state, action) => {
              state.posts.push(action.payload);      
        },
        addPostToStore: (state, action) => {
              state.post = action.payload;
        },
        addUserPostToStore: (state, action)=> {
              state.userPost.push(action.payload);
        }
    },
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
                state.error = action.payload?.message || action.error.message;
         })
    }
})


export const {addPostToStore, addPostsToStore, addUserPostToStore } = postSlice.actions;
export default postSlice.reducer;


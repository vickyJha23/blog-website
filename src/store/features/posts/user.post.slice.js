import { createSlice } from "@reduxjs/toolkit";
import { getUserPostThunk } from "./post.thunk";


const userPostSlice = createSlice({
      name: "userPosts",
      initialState: {
          userPosts: [],
          isLoading: false,
          error:null
      },
      
      reducers: {
           // synchronouse operations
      },
      // asynchronous operations
      extraReducers: (builder) => {
            builder.addCase(getUserPostThunk.pending, (state) => {
                  state.isLoading = true;
            })
            builder.addCase(getUserPostThunk.fulfilled, (state, action) => {
                   state.isLoading = false;
                   state.userPost = action.payload;
            })
            builder.addCase(getUserPostThunk.rejected, (state, action) => {
                    state.isLoading = false,
                    state.error = action.payload?.message || action.error.message;
            })
      }

})



export default userPostSlice.reducer;
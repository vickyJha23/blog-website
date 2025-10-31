import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/posts/post.slice.js"
import userPostReducer from "./features/posts/user.post.slice.js";
import userReducer from "./features/users/user.slice.js";


export const store = configureStore({
     reducer: {
         posts: postReducer,
         user: userReducer,
         userPosts: userPostReducer 
     }
})


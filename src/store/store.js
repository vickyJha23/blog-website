import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/user.slice.js"
import postReducer from "./features/posts/post.slice.js"
import userPostReducer from "./features/posts/user.post.slice.js";



export const store = configureStore({
     reducer: {
         user: userReducer,
         posts: postReducer,
         userPosts: userPostReducer 
     }
})


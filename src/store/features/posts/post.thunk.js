import { createAsyncThunk } from "@reduxjs/toolkit";

export const createPostThunk = createAsyncThunk("post/create", async (token, data) => {
         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}posts/upload`, {
                method: "POST",
                headers: {
                     "Content-Type": "application/json",
                      "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data),
                credentials: "include" 
         })

         return await response.json()
})

export const getAllPostsThunk = createAsyncThunk("post/all", async (payload) => {
          
         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}posts/all-posts?page=${payload.page}&limit=${payload.limit}&sort=${payload.sort}`, {
               method: "GET",
               headers: {
                   "Content-Type": "application/json",
                    "Authorization": `Bearer ${payload.token}`
               },
               credentials: "include"   
         });
         return await response.json();
        
}); 

export const updatePostThunk = createAsyncThunk("post/update", async(postId, postData, token) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}posts/update-post/${postId}`, {
             method: "PUT",
             headers: {
                  "Content-Type": "application/json",
                   "Authorization": `Bearer ${token}`,
             },
             body: JSON.stringify(postData),
             credentials: "include",
        });

        return await response.json();
});

export const deletePostThunk = createAsyncThunk("post/delete", async (postId, token) => {
         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}posts/delet-post/postId`, {
               method: "DELETE",
               headers: {
                     "Content-Type": "application/json",
                      "Authorization": `Bearer ${token}`
               },
               credentials: "include"
         })
         return await response.json(); 
})

export const updatePostImgThunk = createAsyncThunk ("post/imageUpdate", async (postId, data, token) =>  {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}posts/update-img/postId`, {
               method: "PUT",
               headers: {
                     "Content-Type": "application/json",
                     "Authorization":  `Bearer ${token}`
               },
               body: data,
               credentials: "include"     
        })
        return await response.json()
 }) 


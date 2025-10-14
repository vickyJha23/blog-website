import { createAsyncThunk } from "@reduxjs/toolkit";
import { useReducedMotion } from "framer-motion";


export const registerUserThunk = createAsyncThunk("user/register", async (userData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}auth/register`, {
            method:  "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
      });
      return await response.json();
});

export const loginUserThunk = createAsyncThunk("user/login", async (userData) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}auth/login`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
               "Content-Type": "application/json"
            },
            credentials: "include"          
        })
        const data = await response.json();
        if(data.status) {
              localStorage.setItem("accessToken", data.accessToken);    
        } 
        return data; 
})

export const getUserProfileThunk = createAsyncThunk("user/profile", async (token) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}users/profile`, {
              method: "GET",
              headers: {
                   "Authorization": `Bearer ${token}`,                   
              },
              credentials: "include"
       })
       return await response.json();
});


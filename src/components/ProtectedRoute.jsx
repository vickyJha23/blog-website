"use client";
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';


// import {Navigatte}


const ProtectedRoute = ({ children }) => {
     const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    console.log(token);
     const router = useRouter();
    

     const {isLoading, error, data } = useQuery({
          queryKey: ["auth"],
          queryFn: async () => {
                const response = await axiosInstance.get("users/profile");
                return response.data;
          },
          enabled: !!token,
          retry: false

     })
     console.log(data, error, isLoading);

     if(isLoading) {
           return <div className="h-screen flex items-center justify-center">
                <ClipLoader size={48} color='yellow' />
           </div>
     }

     if(!token || error) {
          return router.replace("/")
     }

     if(data) {
          return <> {children }</>
     }

}

export default ProtectedRoute
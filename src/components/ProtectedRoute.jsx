"use client";
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';


// import {Navigatte}


const ProtectedRoute = ({ children }) => {
     const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
     const router = useRouter();

     useEffect(() => {
          if(!token) {
               return router.push("/");
          }
     }, [])


     const {isPending, error, data } = useQuery({
          queryKey: ["auth"],
          queryFn: async () => {
                const response = await axiosInstance.get("users/profile");
                return response.data;
          },
          enabled: Boolean(token),
          retry: false
     })

     if(isPending) {
           return <div className="h-screen flex items-center justify-center">
                <ClipLoader size={48} color='red' />
           </div>
     }

     if(error) {
          return 
     }

     if(data) {
          return <> {children }</>
     }

}

export default ProtectedRoute
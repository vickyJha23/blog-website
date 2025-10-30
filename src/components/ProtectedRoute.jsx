"use client";
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axios';

// import {Navigatte}


const ProtectedRoute = ({ children }) => {
     const router = useRouter();
      const [loading, setIsLoading] = React.useState(true);
     useEffect(() => {
            const token = localStorage.getItem("accessToken");
            if(!token) {
                return router.push("/dash");
            } 

            const checkAuth = async () => {
                 try {
                     const response = await axiosInstance.get("users/profile");
                      if(response.status === 200) {
                            setIsLoading(false);
                      }  

                 } catch (error) {
                     console.log("Error verifying token:", error);
                    setIsLoading(false);
                 }
            }
            checkAuth();

     }, [router]);
   
   
      return (
          <>
             {loading ? (<h1>
                checking auth...
             </h1>
             ): (children)}
        </>
    )
}

export default ProtectedRoute
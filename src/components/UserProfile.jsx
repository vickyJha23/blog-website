"use client"
import React, { use, useEffect, useRef, useState } from 'react'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'
import { ToastContainer } from "react-toastify"
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'




import { profileNavItems } from '../../public/static.js'
import { isPending } from '@reduxjs/toolkit'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/utils/axios.js'
import { useRouter } from 'next/navigation.js'


const UserProfile = () => {
    const router = useRouter();
    const userRef = useRef({});
    const tokenRef = useRef(localStorage.getItem("token") || "");
    const [activeIndex, setActiveIndex] = useState(() => {
        const savedIndex = localStorage.getItem("profileActiveIndex");
        return savedIndex ? parseInt(savedIndex) : 0;
    });


    

    useEffect(() => {
          if(!tokenRef.current ) {
               return router.push("/dash");
            }
    }, []);

    const { isPending, error, data } = useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => {
            return await axiosInstance.get("users/profile");
        },
        staleTime: 5 * 60 * 1000
    });
    
    userRef.current = data?.data || {};
    console.log("current", userRef.current);

    return (
        <div className='h-screen overflow-hidden'>
            <h1>
                  Hello There;
            </h1>
        </div>
    )
}

export default UserProfile
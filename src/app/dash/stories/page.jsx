"use client"
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import axiosInstance from '@/utils/axios'
import { ClipLoader } from 'react-spinners'


const UserPosts = () => {
   
  const {isLoading, error, data} = useQuery({
        queryKey: ["userPosts"],
        queryFn: async () => {
            const response = await axiosInstance.get("posts/user-post");
            return response.data;          
        },
        retry: false
  });

  console.log("data", data);

  if(isLoading) {
       return <div className='h-[calc(100vh-80px)] ml-[256px] mt-20 flex items-center justify-center'>
                 <ClipLoader size={48} color='red' />
           </div>
  }
 
 
  return (
    <section className='ml-[256px] mt-20'>
      
    </section>
  )
}

export default UserPosts
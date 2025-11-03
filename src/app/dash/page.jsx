"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '@/components/PostCard';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/utils/axios';




const DashboardPage = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("asc");
  const limit = 10;
  

  const dispatch = useDispatch();

  const {isPending, error, data} = useQuery({
       queryKey: ['posts', page, sort],
       queryFn: async () => {
            const response = await axiosInstance.get(`posts/all-posts?page=${page}&limit=${limit}&sort=${sort}`)
             return response.data;
           },
           retry: false

  })

  return (
    <div className='w-full overflow-hidden'>
      <div className='h-full ml-[256px] mt-20 flex'>
        <div className='flex flex-col gap-8 pb-20 min-h-screen scrollbar-thin scrollbar-none overflow-y-auto p-4'>
          {isPending ? (<div className='flex items-center justify-center h-[calc(100vh-80px)]'>
            <ClipLoader size={50} color='red' /> </div>
          ) : (!error ? (<>
            {data?.data?.posts?.length > 0 && data.data.posts.map((post, index) => <PostCard key={post._id} id={post._id} post={post} />)}
          </>) : (<div className='flex items-center justify-center h-[calc(100vh-80px)]'>
                  <h1 className='text-black bg-white shadow-md shadow-amber-100 rounded px-3 py-2'>
                                {error.message} </h1> 
          </div>))}
        </div>
      </div>
    </div>
  )
}


export default DashboardPage;
"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostsThunk } from '@/store/features/posts/post.thunk';
import CommentCard from '@/components/CommentCard';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/utils/axios';




const DashboardPage = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("asc");
  
  const limit = 10;
  

  const dispatch = useDispatch();

  const {isPending, error, data:posts} = useQuery({
       queryKey: ['posts', page, sort],
       queryFn: async () => {
            const response = await axiosInstance.get(`posts/all-posts?page=${page}&limit=${limit}&sort=${sort}`)
             return response.data;
           }
  })

 
  return (
    <div className='w-full h-screen overflow-hidden'>
      <div className='h-full ml-[256px] mt-20 flex'>
        <div className='flex-1 flex flex-col gap-4 pb-20 min-h-screen scrollbar-thin scrollbar-none overflow-y-auto p-4'>
          {isPending ? (<div className='flex items-center justify-center h-[calc(100vh-80px)]'>
            <ClipLoader size={50} color='red' /> </div>
          ) : (!error ? (<>
            {posts?.posts?.length > 0 && posts.posts.map((post, index) => <CommentCard key={post._id} id={post._id} post={post} />)}
          </>) : (<div className='flex items-center justify-center h-[calc(100vh-80px)]'>
                  <h1 className='text-black bg-white shadow-md shadow-amber-100 rounded px-3 py-2'>
            {error.message} </h1> 
          </div>))}
        </div>
        <div className='w-[256px] border-l border-l-[#ccc] h-full overflow-hidden p-4'>

        </div>
      </div>
    </div>
  )
}


export default DashboardPage;
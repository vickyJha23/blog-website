"use client"

import { formatLikesAndComments } from '@/utils/util';
import { image } from '@uiw/react-md-editor';
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import AddComment from './AddComment';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/utils/axios';
import { ClipLoader } from 'react-spinners';


const RenderComments = ({id}) => {
  const blog = useSelector((state) => state.posts.post);
  const user = useSelector((state) => state.user.user);
  
  const {isPending, error, data } = useQuery({
         query: ["comments"],
         queryFn: async () => {
              const response = await axiosInstance.get(`comments/${id}`);
              return response.data; 
         }
  })



  return (
     <div className='mt-10'>
          <h1 className='font-bold text-2xl text-black'>
               <span>
                  Responses 
               </span>({formatLikesAndComments(blog.commentCount)})
          </h1>
          <div className='user-profile mt-5'>
              <div className='flex items-center gap-3'>
                   <div className='flex items-center gap-2'>
                      {user?.profileUrl ? <img /> : <div className='bg-pink-400 w-10 h-10 rounded-full flex items-center justify-center'>
                           <span>
                               {user?.userName?.slice(0, 1)}
                           </span>
                        </div>}
                   </div>
                   <p className=' text-black'>{user?.userName}</p>
              </div>
              <AddComment id={id} />    
          </div>
          <div className=''>
                {
                   isPending ? <div className=''>
                     <ClipLoader color='red'  />
                   </div>: error ? <div className='p-3'> <h1 className='text-black text-2xl'>
                      {error.message}
                   </h1> </div> : <div>
                          {data ?  <div className='comments'>



                          </div>: <p> No comments for this post</p> }
                   </div>
                }        
          </div>
      
     </div>
  )
}


export default RenderComments;
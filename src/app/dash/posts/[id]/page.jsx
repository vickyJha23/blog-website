'use client'
import axiosInstance from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { addPostToStore } from '@/store/features/posts/post.slice';
import RenderComments from '@/components/RenderComments';
import RenderBlog from '@/components/RenderBlog';




const PostDetailsPage = ({params}) => {
      const { id:postId } = React.use(params);
      const dispatch = useDispatch();   
    
      const {isPending, error, data} =  useQuery({
         queryKey: ["Post"],
         queryFn: async () => {
             const response = await axiosInstance.get(`posts/${postId}`);
             const {data: {data: {post}}} = response;
             return post
         },
    })

    
    useEffect(() => {
        if(data) {
               dispatch(addPostToStore(data))
           }
    }, [data])
  

    return (
    <section className='ml-[245px] mt-20 p-5 px-10'>
       {isPending ? <div className='h-[calc(100vh-80px)] w-full flex items-center justify-center'>
                  <ClipLoader color='red' size={48}/>
       </div> : error ? <div className='h-[calc(100vh-80px)] w-full text-black flex items-center justify-center'>
             <h1> {error.message || "Something went wrong while fetching"} </h1>
       </div> : <div className='min-h-screen mt-10 flex flex-col gap-4'>
                      <RenderBlog />  
                      <RenderComments id={postId} /> 
                </div>}            
    </section>
  )
}

export default PostDetailsPage;
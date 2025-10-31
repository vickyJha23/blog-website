
"use client"
import React from 'react'

import { useSelector } from 'react-redux'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Heart } from 'lucide-react';
import { MessageCircle } from 'lucide-react';

import { formatDate, formatLikesAndComments } from '@/utils/util'

const RenderBlog = () => {
    const blog = useSelector((state) => state.posts.post);
    console.log(blog);


    return (
        <div className='flex flex-col gap-8 text-black'>
            <h1 className='text-6xl mb-8 font-bold'>
                {blog?.title}
            </h1>
            <div className='flex flex-col gap-4 pb-4'>
                <div className='flex items-center gap-4 pb-4'>
                      {true ? <img className='w-10 h-10 rounded-full object-cover' src="https://plus.unsplash.com/premium_photo-1682096252599-e8536cd97d2b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870" alt="" /> : <p></p>}
                      {`${blog?.author?.userName || "-"} - ${formatDate(blog?.createdAt)}`}
                </div>
                 <div className='flex items-center border-b-[0.1px] border-t-[0.1px] border-[#ccc] py-3 gap-2'>
                      <p className='flex items-center text-gray-400 gap-2'>
                          <button className='flex items-center cursor-pointer hover:text-black'>
                               <Heart />
                          </button>
                           <span className='flex items-center'>
                               {formatLikesAndComments(blog?.likes)}
                           </span> 
                       </p>
                       <p className='flex items-center text-gray-400 gap-2'>
                           <button className='flex items-center cursor-pointer hover:text-black'>
                               <MessageCircle />
                           </button>
                           <span className='flex items-center'>
                               {formatLikesAndComments(blog?.commentCount)}                                 
                           </span>
                       </p>
                </div>  
            </div>
            <div className='flex flex-col gap-4'>
                 <img className='rounded' src={blog?.imageUrl} alt="" />   
                <div>
                     <Markdown remarkPlugins={[remarkGfm]}>{`${blog?.content || "-"}`}</Markdown>
                </div>
            </div>
        </div>
    )
}

export default RenderBlog

import React from 'react'
import { MessageCircle } from 'lucide-react';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';


const PostCard = ({post, id}) => {
  return (
   <Link href={`/dash/posts/${id}`}>
       <div className='w-full h-auto bg-gray-50 rounded text-black'>
         <div className='flex flex-col'>
             <div className='flex w-full p-3 px-4 items-center gap-2  border-b-1 border-b-[#ccc]'>
                 <div className='w-10 h-10 rounded-full'>
                 <img className='w-full h-full object-cover rounded-full' src="https://plus.unsplash.com/premium_photo-1682096252599-e8536cd97d2b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870" alt="" />
                </div>
                 <p>
                    {post.author.userName}
               </p>
             </div>
             <div className='flex items-center w-full px-4 py-2 gap-4'>
                 <div className='flex-1 flex flex-col
                 gap-2  py-2 w-full h-full'>
                    <h1 className='font-bold text-2xl'>
                        {post.title}
                    </h1>
                    <p className='text-gray-400'> 
                         {post.content}
                    </p>
                 </div>
                 <div className="w-[250px] h-full">
                      <Image src={post.imageUrl} width={0} height={0} sizes='100vh' alt='' className='w-1/2 h-1/2 object-contain' />
                      {/* <img src={post.imageUrl} alt="" /> */}
                 </div>
             </div>
             <div className='h-[50px] flex gap-4 border-t border-t-[#ccc] px-4 py-2'>
                   <button className='cursor-pointer hover:text-red-400 flex gap-2 items-center'>
                        <MessageCircle color='gray'  />
                        <span>
                           {post.commentCount}
                        </span>
                  </button> 

                  <button className='cursor-pointer flex gap-2'>
                       <Heart color='gray' />
                       <span>
                          {post.likes} 
                       </span>
                  </button>
             </div>
         </div> 
      </div>
   </Link>
  )
}

export default PostCard
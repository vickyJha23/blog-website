import React from 'react'
import { MessageCircle } from 'lucide-react';
import { Heart } from 'lucide-react';
import Link from 'next/link';


const CommentCard = ({id}) => {
  return (
   <Link href={`/dash/posts/${id}`}>
       <div className='w-full h-auto bg-[#fffdd0] rounded text-black'>
         <div className='flex flex-col'>
             <div className='flex w-full p-3 px-4 items-center gap-2  border-b-1 border-b-[#ccc]'>
                 <div className='w-10 h-10 rounded-full'>
                 <img className='w-full h-full object-cover rounded-full' src="https://plus.unsplash.com/premium_photo-1682096252599-e8536cd97d2b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870" alt="" />
                </div>
                 <p>
                   John doe
               </p>
             </div>
             <div className='flex items-center w-full px-4 py-2 gap-4'>
                 <div className='flex-1 flex flex-col
                 gap-2  py-2 w-full h-full'>
                    <h1 className='font-bold text-2xl'>
                     Adding high availability and scalability to an agentic application based on Land graph and Next.js
                    </h1>
                    <p className='text-gray-400'> 
                       High-availability and  scalability are as equally important to Agentic applications as they are to any other solution. The article..
                    </p>
                 </div>
                 <div className="w-[250px] h-full">
                     <img className='w-full h-full' src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*nNJgWHxGPWn10fHPyqFSYw.png" alt="" />
                 </div>
             </div>
             <div className='h-[50px] flex  gap-2 border-t border-t-[#ccc] px-4 py-2'>
                   <button>
                        <MessageCircle color='gray' />
                  </button> 

                  <button>
                       <Heart color='gray' />
                  </button>
             </div>
         </div> 
      </div>
   </Link>
  )
}

export default CommentCard
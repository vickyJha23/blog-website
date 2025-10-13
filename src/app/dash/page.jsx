"use client"
import React from 'react'

import Sidebar from '@/components/Sidebar'
import CommentCard from '@/components/CommentCard';


const DashboardPage = () => {
   const [isAnimate, setIsAnimate] = React.useState(false);

    const handleIsAnimate = () => {
          setIsAnimate((prev) => !prev);
    }

  return (
    <div className='w-full h-screen overflow-hidden'>
        <div className='h-full ml-[256px] mt-20 flex'>
             <div className='flex-1 flex flex-col gap-4 pb-20 min-h-screen scrollbar-thin scrollbar-none overflow-y-auto p-4'>
                 <CommentCard id={1} />
                 <CommentCard id={2} />
                 <CommentCard  id={3} />
                 <CommentCard id={4} />
                 <CommentCard id={5} />
                 <CommentCard />
                 <CommentCard />
                 <CommentCard />
                 <CommentCard />
                 <CommentCard />
                 <CommentCard />
                 <CommentCard />
              </div>
             <div className='w-[256px] border-l border-l-[#ccc] h-full overflow-hidden p-4'>
              
            </div> 
        </div>
    </div>
  )
}


export default DashboardPage;
'use client';
import React from 'react'
import { useSelector } from 'react-redux'



const UserProfile = () => {
   const { user } = useSelector((state) => state.user);
  
   return (
        <div className='bg-gray-200 w-full px-4 py-4 rounded flex flex-col gap-4'>
             <p className='text-black capitalize flex items-center gap-2'>
                 <span className='flex items-center justify-center font-bold w-8 h-8 bg-pink-400 rounded-full'>{user.userName?.slice(0,1)}</span> {user?.user?.userName}
              </p>   
              <h2 className='text-black text-xl font-bold'>
                  Reading List
              </h2>
              <p className='text-black text-sm'>
                   No stories
              </p>
        </div>
  )
}

export default UserProfile
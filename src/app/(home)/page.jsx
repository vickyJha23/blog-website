"use client";
import React, { useCallback } from 'react'
import { store } from '../../static.js'

import Modal from '@/components/Modal'





const page = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState("");

    const handleIsLoggedIn = useCallback(() => {
            alert("fdhfjdkfjdhfjkdhf");
           setIsLoggedIn(!isLoggedIn);
    }, [isLoggedIn])


  return (
          <main style={{
             height: "calc(100vh - 144px)"
          }} className='flex items-center px-6 w-full max-w-11/12 mx-auto justify-between'>
             <div className='flex flex-col gap-8'>
                  <h1 className='text-black font-bold text-7xl'>
                      Human  <br />
                        stories
                      <br className='md:hidden' />
                     & ideas
                 </h1>
                 <p className='text-black text-xl'>
                   A place to read, write and deepen your understanding
                 </p>
                 <button className='bg-green-500 text-white cursor-pointer transition-all duration-200 ease-in-out hover:bg-green-300 py-2 text-base w-48 capitalize font-semibold tracking-wide rounded-3xl'>
                     start reading
                 </button>
             </div>
             <div>
                 <img src={store.heroImg} alt="" className='w-96' />
             </div>
              {
                 isLoggedIn && <Modal handleIsLoggedIn={handleIsLoggedIn}/>
              } 
          </main>
  )
}

export default page
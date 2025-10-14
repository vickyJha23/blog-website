"use client";
import React, { useCallback } from 'react'
import Link from 'next/link';

import Modal from '@/components/Modal'
import Image from 'next/image.js';
import heroImg from "../../../public/images/hero.png";


import { useSelector } from 'react-redux';


const HomePage = () => {
     const {isModalActive} = useSelector((state) => state.modal);
     console.log(isModalActive);

  return (
          <main style={{
              height: "calc(100vh - 60px)"
          }}  className='overflow-hidden flex items-center px-6 w-full max-w-11/12 mx-auto justify-center'>
             <div className='h-full w-full flex-1 mt-20 flex flex-col justify-center gap-8'>
                  <h1 className='text-black text-balance font-bold text-4xl md:text-7xl'>
                      Human  <br />
                        stories
                      <br className='md:hidden' />
                     & ideas
                 </h1>
                 <p className='text-black text-balance md:text-xl'>
                   A place to read, write and deepen your understanding
                 </p>
                 <Link href="/dash">
                 <button className='bg-green-500 text-white cursor-pointer transition-all duration-200 ease-in-out hover:bg-green-300 py-2 text-base w-48 capitalize font-semibold tracking-wide rounded-3xl'>
                     start reading
                 </button>
                 </Link>
             </div>
             <div className='mt-20 w-xl flex justify-center'>
                 <Image alt="" height={0} width={0} sizes='100%' src={heroImg} className='lg:w-1/2 aspect-auto' />
             </div>
              {
                 isModalActive && <Modal/>
              } 
          </main>
  )
}

export default HomePage
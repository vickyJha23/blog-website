"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, NotebookPen } from 'lucide-react';
import Image from 'next/image';
import avatar from "../../public/images/avatar.png"
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setModalStatus } from '@/store/features/users/user.slice';
import { LogoutDropdown } from './LogoutDropdown';
import { setLogoutButtonStatus } from '@/store/features/users/user.slice';

const Navigation = () => {
     const router = useRouter();
     const dispatch = useDispatch()
     const pathName = usePathname();
     const isLogoutButtonActive = useSelector((state) => state.user.isLogoutButtonActive);

     const handleNavigation = (eventTriggeredBy = "") => {
          const token = localStorage.getItem("accessToken");
          if (!token) {
               return dispatch(setModalStatus(true));
          }
          return eventTriggeredBy === "write" ? router.push("/dash/write-post") : router.push("/dash")
     }



     if (pathName === "/") {
          return (<nav className='fixed  top-0 left-0 z-20 w-full h-20 border-b-2 border-b-black flex justify-between items-center px-6'>
               <div className='text-center'>
                    <h2 className='font-bold text-3xl text-black'>
                         Medium
                    </h2>
               </div>

               <div className='flex items-center gap-8'>
                    <div className='hidden md:flex items-center'>
                         <ul className='flex gap-6 text-black text-base tracking-wide'>
                              <li onClick={() => handleNavigation("write")}>
                                   <Link href="">
                                        Write
                                   </Link>
                              </li>
                              <li onClick={() => dispatch(setModalStatus(true))}>
                                   <Link href="">
                                        Sign in
                                   </Link>
                              </li>

                         </ul>
                    </div>
                    <button onClick={() => handleNavigation()} className='bg-black cursor-pointer hover:bg-gray-900 px-4 py-2 capitalize rounded-3xl text-sm flex items-center justify-center'>
                         get started
                    </button>
               </div>
          </nav>)
     }


     return (
          <nav className='fixed  top-0 left-0 bg-white z-30 w-full h-20 border-b-1 border-b-[#ccc] flex justify-between items-center px-6'>
               <div className='flex gap-2 items-center'>
                    <button>
                         <Menu size={22} color='black' />
                    </button>
                    <h2 className='font-bold text-3xl text-black'>
                         Medium
                    </h2>
                    <div className='hidden md:flex ml-5  items-center'>
                         <input type="text" placeholder='Search' className='text-black outline-none focus:outline-none placeholder:text-black px-3 rounded-tl-[20px] rounded-bl-[20px] w-[200px] py-2 border-1' />
                         <button className='bg-black border-1 border-black py-2 px-3 rounded-tr-[20px] rounded-br-[20px]' >
                              <Search />
                         </button>
                    </div>
               </div>

               <div className='flex items-center gap-4 md:gap-8'>
                    <div className='flex md:hidden'>
                         <button className='text-black'>
                              <Search size={26} />
                         </button>
                    </div>

                    <div className='hidden md:flex items-center'>
                         <Link onClick={handleNavigation} href="/dash/write-post" className='flex text-black text-base tracking-wide gap-2'>
                              <NotebookPen />
                              <span className='font-semibold tracking-wide'>
                                   Write
                              </span>
                         </Link>
                    </div>
                    <div className='bg-black w-[40px] h-[40px] rounded-full overflow-hidden'>
                         <Image onClick={() => {
                           dispatch(setLogoutButtonStatus())
                    }} width={0} height={0} sizes='100vw' className='w-full h-full object-cover rounded-full' src={avatar} alt="" />
                         {isLogoutButtonActive && <LogoutDropdown  />}
                      </div>
               </div>


          </nav>
     )
}

export default Navigation
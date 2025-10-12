"use client";
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search,NotebookPen } from 'lucide-react';


const Navigation = () => {
     const pathName = usePathname();
     console.log(pathName);

    if(pathName === "/") {
         return (<nav className='w-full h-20 border-b-2 border-b-black flex justify-between items-center px-6 overflow-hidden'>
         <div className='flex items-center'>
             <h2 className='font-bold text-3xl text-black'>
                  Medium
             </h2>
         </div>

         <div className='flex items-center gap-8'>
            <div className='hidden md:flex items-center'>
                 <ul className='flex gap-6 text-black text-base tracking-wide'>
                     <li>
                        <Link href="">
                              Write
                        </Link>
                     </li>   
                     <li>
                        <Link href="">
                              Sign in
                        </Link>
                     </li>   
                 
                 </ul>   
                  
            </div> 
               
             <button className='bg-black px-4 py-2 capitalize rounded-3xl text-sm flex items-center justify-center'>
                 get started
             </button>
        </div>
    </nav>)
     }


  return (
    <nav className='w-full h-20 border-b-1 border-b-[#ccc] flex justify-between items-center px-6 overflow-hidden'>
         <div className='flex gap-2 items-center'>
              <button>
                   <Menu size={22} color='black' />
              </button>
             <h2 className='font-bold text-3xl text-black'>
                  Medium
             </h2>

              <div className='hidden md:flex ml-5  items-center'>
                 <input type="text" placeholder='Search' className='placeholder:text-black px-3 rounded-tl-[20px] rounded-bl-[20px] w-[200px] py-2 border-1' />
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
                 <ul className='flex gap-6 text-black text-base tracking-wide'>
                     <li>
                        <Link href="" className='flex gap-2'>
                              <NotebookPen />  
                              <span className='font-semibold tracking-wide'>
                                   Write
                              </span>
                        </Link>
                     </li>   
                 </ul>   
                
                
            </div> 
            <div className='bg-black w-[40px] h-[40px] rounded-full'>
                 <img src="" alt="" />
            </div>
        </div>

       
    </nav>
  )
}

export default Navigation
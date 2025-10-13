"use client"
import React, { useState } from 'react'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'
    const profileNavItems = [
  {
    name: "Home",
    href: "/dash/profiles"
  },
  {
    name: "About",
    href: "/dash/profiles/about"
   }
];


const ProfilesLayout = ({children}) => {
    const [activeIndex, setActiveIndex] = React.useState(0);

     const activeIndexHandler = (index) => {
           setActiveIndex(index);  
    
        }

    
  return (
      <div className='h-screen overflow-hidden'>
            <section className='h-full ml-62 mt-20'>
            <div className='flex h-full'> 
             <div className='w-full h-full flex-1 p-8 pt-16 overflow-auto'>
                <div className='flex justify-between'>
                      <h1 className='text-4xl font-bold text-black'>
                           John Doe 
                      </h1>
                      <button>
                         <Ellipsis color='black' />
                      </button>
                </div>
                 <div className='mt-4'>
                     <ul className='flex gap-4 text-black border-b-1 border-b-[#ccc] py-2'>
                          {profileNavItems.map((profileNavItem, index) => (<li key={index}>
                              <Link onClick={() => activeIndexHandler(index)} key={name} className={`py-3 ${activeIndex === index ? "border-b-1 border-b-black": ""}`} href={profileNavItem.href}>
                                   {profileNavItem.name}  
                              </Link>
                          </li>))}
                     </ul>
                </div>
                <div className='mt-8'>
                    {children}
                </div>
             </div>
              <div className='w-64 border-l-1 border-l-[#ccc] overflow-hidden'>
                 <div className='p-4'>
                     <div className='w-20 h-20 bg-red-500 rounded-2xl overflow-hidden'>
                         <img src="https://plus.unsplash.com/premium_photo-1682096252599-e8536cd97d2b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870" alt="" className='w-full h-full object-cover' />
                     </div>  
                     <p className='text-black mt-2 font-bold'>
                         John Doe
                     </p>
                     <p className='text-green-500 text-sm mt-5 tracking-wide cursor-pointer'>
                         Edit Profile
                     </p>
                 </div>
              </div>   
             </div>  
       </section>
      </div>
  )
}

export default ProfilesLayout
"use client"
import React, { useState, useEffect } from 'react'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { store } from '@/store/store'
import { ClipLoader } from 'react-spinners'
import  { ToastContainer}   from "react-toastify"

import { getUserProfileThunk } from '@/store/features/users/userThunk'
import { toast } from 'react-toastify'


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






const ProfilesLayout = ({ children }) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const dispatch = useDispatch();
    const { isLoading, user } = useSelector((state) => state.user);
    const activeIndexHandler = (index) => {
        setActiveIndex(index);
    }

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if(!token) {
             return;
        }
        const getProfile = async () => {
            try {
                const response = await dispatch(getUserProfileThunk(token)).unwrap();
                toast.success(response.message);
            } catch (error) {
                toast.error(error.message);
            }
        }
        getProfile();
    }, [])


    return (
        <Provider store={store}>
            <>
               {!isLoading ? (<div className='h-screen overflow-hidden'>
                <section className='h-full ml-62 mt-20'>
                    <div className='flex h-full'>
                        <div className='w-full h-full flex-1 p-8 pt-16 overflow-auto'>
                            <div className='flex justify-between'>
                                <h1 className='text-4xl font-bold text-black'>
                                    {user?.user?.userName}
                                </h1>
                                <button>
                                    <Ellipsis color='black' />
                                </button>
                            </div>
                            <div className='mt-4'>
                                <ul className='flex gap-4 text-black border-b-1 border-b-[#ccc] py-2'>
                                    {profileNavItems.map((profileNavItem, index) => (<li key={index}>
                                        <Link onClick={() => activeIndexHandler(index)} key={name} className={`py-3 ${activeIndex === index ? "border-b-1 border-b-black" : ""}`} href={profileNavItem.href}>
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
                                    {user?.user?.userName}
                                </p>
                                <p className='text-green-500 text-sm mt-5 tracking-wide cursor-pointer'>
                                    Edit Profile
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>) : (<div className='ml-[256px] mt-20 h-[80vh] flex justify-center items-center'>
                <ClipLoader color='red' size={100} />
            </div>)}
                 <ToastContainer />
            </>
        </Provider>
    )
}

export default ProfilesLayout
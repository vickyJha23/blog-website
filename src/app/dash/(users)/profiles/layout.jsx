"use client"
import React, { useState, useEffect, useRef, use } from 'react'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'
import { Provider, useDispatch } from 'react-redux'
import { store } from '@/store/store'
import { ClipLoader } from 'react-spinners'
import { profileNavItems } from '../../../../../public/static';
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/utils/axios.js'
import { addUserToStore } from '@/store/features/users/user.slice'
import ProtectedRoute from '@/components/ProtectedRoute'

const ProfilesLayout = ({ children }) => {
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = React.useState(() => {
        const savedIndex = localStorage.getItem("profileActiveIndex");
        return savedIndex ? parseInt(savedIndex) : 0;
    });

    const activeIndexHandler = (index, key) => {
        if (index) {
            setActiveIndex(index);
            localStorage.setItem("profileActiveIndex", index);
        }
    }

    const { isPending, error, data: user } = useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => {
            const { data: { user } } = await axiosInstance.get("/users/profile");
            return user;
        },
        staleTime: 5 * 60 * 1000
    })
   
    useEffect(() => {
        if (user) {
            dispatch(addUserToStore(user));
        }

    }, [user, dispatch]);


    return (
        <ProtectedRoute >
            <Provider store={store}>
                <div className=''>
                    {isPending ? (<div className='h-[calc(100vh-80px)] flex justify-center items-center'>
                        <ClipLoader color='red' size={48} />
                    </div>) : error ? (<div className='h-[calc(100vh-80px)] flex justify-center items-center'>
                        <h1 className='text-black font-bold bg-white shadow-md shadow-amber-100 px-3 py-2'>
                        {error.message || "error fetching profile data"}
                    </h1>
                    </div>) : (<div className='h-screen overflow-hidden'>
                        <section className='h-full ml-62 mt-20'>
                            <div className='flex h-full'>
                                <div className='w-full h-full flex-1 p-8 pt-16 overflow-auto'>
                                    <div className='flex justify-between'>
                                        <h1 className='text-4xl font-bold text-black'>
                                            {user?.userName}
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
                                            {user?.userName}
                                        </p>
                                        <p className='text-green-500 text-sm mt-5 tracking-wide cursor-pointer'>
                                            Edit Profile
                                        </p>
                                        <p className='text-black mt-4'>
                                            {user?.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>)}
                </div>
            </Provider>
        </ProtectedRoute>
    )
}

export default ProfilesLayout
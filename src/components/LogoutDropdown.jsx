"use client"
import axiosInstance from '@/utils/axios';
import { isPending } from '@reduxjs/toolkit';
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setLogoutButtonStatus } from '@/store/features/users/user.slice';



export const LogoutDropdown = ({handleLogoutButton}) => {
     const router = useRouter();
     const dispatch = useDispatch();

     const handleLogout = () => {
         mutation.mutate();
    }
    
  const mutation = useMutation({
       mutationFn: async () => {
           return await axiosInstance.delete("auth/logout")
       },
       onSuccess: (data) => {
           toast.success(data.data.message);
           localStorage.removeItem("accessToken");
           localStorage.removeItem("user");
           localStorage.clear();
           setLogoutButtonStatus();
           router.push("/");

       },
       onError: (error) => {
            toast.error(error.message);
       }
  });    

  
  return (
    <div className="absolute z-50 top-16 right-10">
         <button onClick={handleLogout} disabled={mutation.isPending} className='cursor-pointer bg-red-400 border-0 outline-0 rounded shadow-md px-3 py-2 w-[100px]'>
              Logout
         </button>
    </div>
  )
}

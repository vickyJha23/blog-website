"use client"
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useSelector, useDispatch } from 'react-redux'
import { getUserPostThunk } from '@/store/features/posts/post.thunk'
import { getUserProfileThunk } from '@/store/features/users/userThunk'


const UserPosts = () => {
  const { user } = useSelector((state) => state.user);
  const { isLoading, userPosts } = useSelector((state) => state.userPosts);
  const token = localStorage.getItem("accessToken");
  const dispatch = useDispatch();


  useEffect(() => {
    if (token) {
      dispatch(getUserProfileThunk(token));
    }
  }, [])


  const fetchUserRelatedPosts = async () => {
    try {
      const response = await dispatch(getUserPostThunk({ userId: user.user?._id, token })).unwrap();
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message);
    }

  }

  useEffect(() => {
    if (user?.user?._id && token) {
      fetchUserRelatedPosts();
    }
  }, [])

  console.log(userPosts);


  return (
    <section className='ml-[256px] mt-20'>
      {userPosts.length > 0 ? (<></>) : (<h1 className='text-red-400 text-3xl'>
        No posts yet
      </h1>)}
    </section>
  )
}

export default UserPosts
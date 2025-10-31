"use client"

import axiosInstance from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'


const AddComment = ({id, handleRefetch}) => {
    const [newComment, setNewComment] = useState({
           content: "",
                       
    });    

     const handleAddComment = (e) => {
         e.preventDefault();
         if(newComment) {
              mutation.mutate(newComment);
              setNewComment({...newComment, content: ""})
          }

     }

     const mutation = useMutation({
          mutationFn: async (newComment) => {
             const response = await axiosInstance.post(`comments/add-comment?postId=${id}` , newComment);
              return response.data;
          },

          onSuccess: (data) => {
               toast.success(data);
                // handleRefetch();                
           },

          onError: (error) => {
                console.log(error);
                toast.error(error.message);
          }


     })

    return (
    <form onSubmit={handleAddComment} className="mt-6 space-y-3">
          <textarea
            placeholder="Write a comment..."
            value={newComment.content}
            onChange={(e) =>
              setNewComment({ ...newComment, content: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 placeholder:text-black text-black"
            rows="3"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Comment
          </button>
        </form>
  )
}

export default AddComment
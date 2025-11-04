'use client';

import axiosInstance from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { addPostToStore } from '@/store/features/posts/post.slice';
import RenderComments from '@/components/RenderComments';
import RenderBlog from '@/components/RenderBlog';

const PostDetailsPage = ({ params }) => {
  // ✅ Corrected: destructure params properly
  const { id: postId } = params;
  const dispatch = useDispatch();

  // ✅ Query for fetching single post
  const { isPending, error, data } = useQuery({
    queryKey: ['Post', postId],
    queryFn: async () => {
      const response = await axiosInstance.get(`posts/${postId}`);
      const {
        data: {
          data: { post },
        },
      } = response;
      return post;
    },
  });

  // ✅ Store post in Redux when fetched
  useEffect(() => {
    if (data) {
      dispatch(addPostToStore(data));
    }
  }, [data, dispatch]);

  return (
    <section
      className="
        min-h-screen 
        px-4 sm:px-6 md:px-10 
        py-6 sm:py-10 
        mt-16 md:mt-20 
        md:ml-[245px] 
        transition-all duration-300
      "
    >
      {/* Loader */}
      {isPending ? (
        <div className="h-[calc(100vh-80px)] flex items-center justify-center">
          <ClipLoader color="red" size={48} />
        </div>
      ) : error ? (
        <div className="h-[calc(100vh-80px)] text-black flex items-center justify-center text-center px-4">
          <h1 className="text-lg sm:text-xl font-medium">
            {error.message || 'Something went wrong while fetching.'}
          </h1>
        </div>
      ) : (
        <div
          className="
            flex flex-col 
            gap-8 sm:gap-10 
            mt-4 sm:mt-8 
            max-w-5xl 
            mx-auto 
            w-full
          "
        >
          {/* Blog Content */}
          <RenderBlog />

          {/* Comments Section */}
          <div className="border-t border-gray-200 pt-6">
            <RenderComments id={postId} />
          </div>
        </div>
      )}
    </section>
  );
};

export default PostDetailsPage;

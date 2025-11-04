"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PostCard from "@/components/PostCard";
import { ClipLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";

const DashboardPage = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("asc");
  const limit = 10;

  const dispatch = useDispatch();

  const { isPending, error, data } = useQuery({
    queryKey: ["posts", page, sort],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `posts/all-posts?page=${page}&limit=${limit}&sort=${sort}`
      );
      return response.data;
    },
    retry: false,
  });

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div
        className="
          min-h-screen 
          flex 
          flex-col 
          gap-6 
          px-4 sm:px-6 md:px-10 
          py-6 sm:py-8 md:py-10 
          mt-16 md:mt-20 
          lg:ml-[256px]
          transition-all duration-300
        "
      >
        {isPending ? (
          <div className="flex items-center justify-center h-[calc(100vh-80px)]">
            <ClipLoader size={50} color="red" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-[calc(100vh-80px)] text-center">
            <h1 className="text-black bg-white shadow-md shadow-amber-100 rounded px-4 py-2 text-sm sm:text-base md:text-lg">
              {error.message || "Something went wrong while fetching posts."}
            </h1>
          </div>
        ) : (
          <div
            className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              lg:grid-cols-1 
              gap-6 sm:gap-8 
              w-full 
              pb-10
            "
          >
            {data?.data?.posts?.length > 0 ? (
              data.data.posts.map((post) => (
                <PostCard key={post._id} id={post._id} post={post} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-20">
                <p className="text-base sm:text-lg">No posts available yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

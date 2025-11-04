"use client";

import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import axiosInstance from "@/utils/axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addUserPostToStore } from "@/store/features/posts/post.slice";
import { useRouter } from "next/navigation";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: async (fd) => {
      const response = await axiosInstance.post("posts/upload", fd);
      return response.data;
    },
    onSuccess: (data) => {
      if (data) {
        dispatch(addUserPostToStore(data.posts));
        toast.success(data.message);
        router.push("/dash");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !file)
      return toast.error("Title, Content, and File are required!");
    const fd = new FormData();
    fd.append("title", title);
    fd.append("content", content);
    fd.append("file", file);
    mutation.mutate(fd);
  };

  return (
    <div
      className="
        ml-0 md:ml-[240px] 
        mt-16 md:mt-20 
        h-auto min-h-[calc(100vh-80px)]
        overflow-x-hidden overflow-y-auto 
        px-3 sm:px-6 md:px-8 lg:px-12 
      "
      data-color-mode="light"
    >
      <div className="py-4 sm:py-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-black mb-4">
          Create Post
        </h2>

        <form
          onSubmit={handleSubmit}
          className="
            flex flex-col gap-4 
            bg-white p-4 sm:p-6 md:p-8 
            rounded-2xl shadow-md 
            w-full max-w-3xl mx-auto
          "
        >
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="
                w-full border border-gray-300 rounded-lg 
                px-3 py-2 sm:px-4 sm:py-2.5 
                focus:outline-none focus:ring focus:ring-blue-200 
                placeholder:text-gray-400 text-black text-sm sm:text-base
              "
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Image Upload
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="
                w-full border border-gray-300 rounded-lg 
                px-3 py-2 sm:px-4 sm:py-2.5 
                focus:outline-none focus:ring focus:ring-blue-200 
                text-gray-700 text-sm sm:text-base
              "
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Content
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <MDEditor
                value={content}
                onChange={setContent}
                height={300}
                className="text-black"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="
              bg-blue-600 text-white 
              px-5 sm:px-6 py-2 sm:py-2.5 
              rounded-lg hover:bg-blue-700 
              transition-all duration-300 
              w-fit disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {mutation.isPending ? "Publishing..." : "Publish"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

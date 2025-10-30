"use client"


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
              if(data) {
                  dispatch(addUserPostToStore(data.posts));   
                  toast.success(data.message);
                  router.push("/dash");
              }
            },
          onError: (error) => {
             console.log(error);
             toast.error(error.message);
          }
    });
    
    const handleSubmit = (e) => {
       e.preventDefault();  
      if(!title || !content || !file ) return toast.error("Title, Content, File are required !");
         const fd = new FormData(); 
              fd.append("title", title);
              fd.append("content", content);
              fd.append("file", file);
             mutation.mutate(fd);
     }

  return (
    <div
      className="ml-[240px] mt-20 h-[calc(100vh-80px)] overflow-x-hidden overflow-y-auto"
      data-color-mode="light"
    >
      <div className="py-2 px-5">
        <h2 className="text-xl font-semibold text-black mb-4">Create Post</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-3xl bg-white p-5 rounded-2xl shadow-sm"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 placeholder:text-black text-black"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Image URL
            </label>
            <input
              type="file"
              onChange={(e) => {
                  const file = e.target.files[0];
                  setFile(file);
              }}
              placeholder="Paste image URL (optional)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 placeholder:text-black text-black"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Content
            </label>
            <MDEditor value={content} onChange={setContent} height={400} className="text-black" />
          </div>

          <button
          type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all w-fit"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

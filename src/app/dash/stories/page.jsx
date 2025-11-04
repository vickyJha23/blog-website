"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, PlusCircle, X } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const UserPosts = () => {
  const [editModal, setEditModal] = useState({
    open: false,
    post: null,
    previewImage: null,
  });


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        
        setEditModal((prev) => ({
          ...prev,
          post: { ...prev.post, imageUrl: file },
          previewImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  
  const openEditModal = (post) => {
    setEditModal({
      open: true,
      post,
      previewImage: post.imageUrl,
    });
  };
 const closeEditModal = () => {
    setEditModal({ open: false, post: null, previewImage: null });
  };

 
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["userPost"],
    queryFn: async () => {
      const response = await axiosInstance.get("posts/user-post");
      return response.data.data;
    },
  });



  const updateMutation = useMutation({
    mutationKey: ["updatedPost"],   
    mutationFn: async (data) => {
           return axiosInstance.put(`posts/update-post/${data.id}`, data.fd); 
       },
       onSuccess: (data) => {
           toast.success(data.message);
           console.log("data", data);
           refetch(); 
           closeEditModal();
       },
       onError: (error) => {
           console.log(error);
           toast.error(error.message);
       }
  })

  const deleteMutation = useMutation({
         mutationKey: ["deletePost"],
         mutationFn: async (id) => {
             return axiosInstance.delete(`posts/delete-post/${id}`);
         },

         onSuccess: (data) => {
             toast.success(data?.message);
             refetch(); 
             closeEditModal();
         },
         onError: (error) => {
             toast.error(error.message);
         }
  })




  const handleUpdate = (e, id) => {
    e.preventDefault();
    console.log(id);
    console.log(editModal);
    const {title, content, imageUrl} = editModal.post;
    if(!title || !content) {
         toast.error("title and content are required");
    }   
    const fd = new FormData();
    fd.append("title", title);
    fd.append("content", content);
    fd.append("file", imageUrl);
    updateMutation.mutate({fd, id});
  };


  const handleDelete = (id) => {
         deleteMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="md:ml-[256px] h-screen mt-20 flex items-center justify-center">
        <ClipLoader size={48} color="red" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="md:ml-[256px] h-screen mt-20 flex items-center justify-center">
        <h1 className="text-black font-bold text-xl">
          {error.message || "Something went wrong"}
        </h1>
      </div>
    );
  }

  return (
    <div className="md:ml-[256px] p-6 mx-auto text-black mt-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Your Posts</h1>
      </div>

      {/* Posts List */}
      <div className="space-y-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {data?.post?.length === 0 && (
          <p className="text-gray-500 text-center">No posts yet. Add one!</p>
        )}
        {data?.post?.map((post) => (
          <motion.div
            key={post._id}
            layout
            className="bg-white p-4 rounded-lg w-full shadow-md border border-gray-200 text-black"
          >
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full max-h-64 object-cover rounded mb-3"
              />
            )}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(post)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div
              className="text-gray-800 prose max-w-none"
              dangerouslySetInnerHTML={{
                __html:
                  post.content.length > 50
                    ? post.content.slice(0, 80) + "..."
                    : post.content,
              }}
            ></div>
          </motion.div>
        ))}
      </div>

      {/* ===== EDIT MODAL ===== */}
      <AnimatePresence>
        {editModal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white text-black rounded-lg shadow-lg p-6 w-[90%] max-w-lg relative"
            >
              <button
                onClick={closeEditModal}
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-bold mb-4">Edit Post</h2>

              <form onSubmit={(e) => handleUpdate(e, editModal.post?._id)}>
                {/* Title */}
                <input
                  type="text"
                  value={editModal.post?.title || ""}
                  onChange={(e) =>
                    setEditModal((prev) => ({
                      ...prev,
                      post: { ...prev.post, title: e.target.value },
                    }))
                  }
                  className="w-full p-2 mb-3 border border-gray-300 rounded"
                  placeholder="Post title"
                />

                {/* Content */}
                <textarea
                  value={editModal.post?.content || ""}
                  onChange={(e) =>
                    setEditModal((prev) => ({
                      ...prev,
                      post: { ...prev.post, content: e.target.value },
                    }))
                  }
                  className="w-full p-2 mb-3 border border-gray-300 rounded min-h-[120px]"
                  placeholder="Write your post..."
                ></textarea>

      
                {/* Update Main Image */}
                <div className="mb-3">
                  <label className="block mb-1 font-medium">Update Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                         handleImageChange(e)
                    }}
                    className="block w-full text-sm text-gray-700"
                  />
                  {editModal.previewImage && (
                    <div className="mt-3 relative">
                      <img
                        src={editModal.previewImage}
                        alt="Preview"
                        className="w-full max-h-60 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setEditModal((prev) => ({
                            ...prev,
                            previewImage: null,
                            post: { ...prev.post, imageUrl: null },
                          }))
                        }
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                            <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <button disabled={updateMutation.isPending}
                  type="submit"
                  className="bg-blue-500 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Update Post
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserPosts;

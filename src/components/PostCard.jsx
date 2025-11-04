import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Heart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { toast } from "react-toastify";
import { useState } from "react";

export default function PostCard({ post, id }) {
         
    const [isLiked, setIsLiked] = useState(() => {
               const savedLiked = localStorage.getItem("like");
               return savedLiked === "true";
                
         });

      const queryClient = useQueryClient();
      
      const mutation = useMutation({
            mutationKey: ["like"],
            mutationFn: async () => {
               const response = await axiosInstance.post(`posts/like/${id}`);
               return response.data;
            },

            onSuccess: (data) => {
                  if(data) {
                       const liked =  data.data.LikedFlag;
                       if(liked) {
                             localStorage.setItem("like", "true");
                             setIsLiked(true);
                       }
                       else {
                           localStorage.setItem("like", "false");
                             setIsLiked(false);
                       }
                       queryClient.invalidateQueries("posts");
                  }
              },
            onError: (error) => {
                 console.log(error);
                toast.error(error.message);
            },
      });
    

      
      const handleLikeAdnDisLike = () => {
            mutation.mutate();  
       } 



   return (
      <div className="w-full bg-gray-50 rounded-lg text-black hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex w-full p-3 px-4 items-center gap-2 border-b border-b-[#ccc]">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://plus.unsplash.com/premium_photo-1682096252599-e8536cd97d2b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"
                alt="Author"
              />
            </div>
            <p className="font-medium text-sm sm:text-base">{post.author.userName}</p>
          </div>

          {/* Body */}
          <Link href={`/dash/posts/${id}`}>
                <div className="flex flex-col md:flex-row items-start md:items-center w-full px-4 py-3 gap-4">
            {/* Text section */}
            <div className="flex-1 flex flex-col gap-2 w-full">
              <h1 className="font-bold text-lg sm:text-xl md:text-2xl">
                {post.title}
              </h1>
              <p className="text-gray-500 text-sm sm:text-base line-clamp-3">
                {post.content}
              </p>
            </div>

            {/* Image section */}
            {post.imageUrl && (
              <div className="w-full md:w-[250px] h-auto flex justify-center">
                <Image
                  src={post.imageUrl}
                  width={250}
                  height={150}
                  sizes="(max-width: 768px) 100vw, 250px"
                  alt="Post"
                  className="rounded-lg object-contain w-full h-auto"
                />
              </div>
            )}
          </div>
           </Link> 
          {/* Footer */}
          <div className="h-[50px] flex justify-between sm:justify-start gap-6 border-t border-t-[#ccc] px-4 py-2">
            <button onClick={() => {}} className="cursor-pointer hover:text-red-400 flex gap-2 items-center transition-colors">
              <MessageCircle color="gray" size={20} />
              <span className="text-sm">{post.commentCount}</span>
            </button>

            <button onClick={() => {
                 handleLikeAdnDisLike();
            }} className="cursor-pointer hover:text-pink-500 flex gap-2 items-center transition-colors">
              <Heart className="border-none" fill= {isLiked === true ? "red": "gray"}   size={20} />
              <span className="text-sm">{post.likes}</span>
            </button>
          </div>
        </div>
      </div>

  );
}

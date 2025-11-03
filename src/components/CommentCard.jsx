import React from "react";
import { MessageSquare } from "lucide-react"; // 
import { formatDate } from "@/utils/util";

const CommentCard = ({ comment }) => {
  return (
    <div className="flex gap-3 p-4 bg-white ">
      {/* Icon or avatar */}
      <div className="flex items-start justify-center">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
          {comment.author?.userName?.[0]?.toUpperCase() || "U"}
        </div>
      </div>

      {/* Comment content */}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-800 font-semibold">
            {comment.author?.userName || "Unknown User"}
          </h3>
          <span className="text-sm text-gray-500">
               {formatDate(comment.createdAt)}
          </span>
        </div>
        <p className="text-gray-700 mt-1">{comment.text}</p>
        {comment.author?.email && (
          <p className="text-xs text-gray-400 mt-1">
            {comment.author.email}
          </p>
        )}
        
       <p className="text-gray-700 mt-2">{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
"use client"
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostsThunk } from '@/store/features/posts/post.thunk';
import CommentCard from '@/components/CommentCard';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';




const DashboardPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("asc");
  const {isLoading, error, posts} = useSelector((state) => state.posts);
  
   const dispatch = useDispatch();

    const fetchPosts = async ()=> {
             try {
                const token = localStorage.getItem("accessToken");
                const response = await dispatch(getAllPostsThunk({page, limit, sort, token})).unwrap();
                 toast.success(response.message);
               } catch (error) {
                  toast.error(error.message);
              }
        }


   useEffect(() => {
        fetchPosts();
   }, []);
   console.log(posts);


  return (
    <div className='w-full h-screen overflow-hidden'>
        <div className='h-full ml-[256px] mt-20 flex'>
             <div className='flex-1 flex flex-col gap-4 pb-20 min-h-screen scrollbar-thin scrollbar-none overflow-y-auto p-4'>
                   {isLoading ? (
                      <ClipLoader size={50} color='red' />
                   ) : (!error ? (<>
                             {posts?.posts?.length > 0 && posts.posts.map((post, index) => <CommentCard key={post._id} id={post._id} post={post}  />)}               
                   </>): (<h1>
                       {error}</h1>))}
              </div>
             <div className='w-[256px] border-l border-l-[#ccc] h-full overflow-hidden p-4'>
              
            </div> 
        </div>
    </div>
  )
}


export default DashboardPage;
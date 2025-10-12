"use client"
import React from 'react';
import { Menu, Home, User, BookText } from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence, motion } from "framer-motion"


const Sidebar = ({isAnimate = true, handleIsAnimate}) => {


    return (
        <>
           <motion.div initial={{
              width: 0,
              opacity:0
        }}   animate={{
               width: isAnimate ? "100": "0",
               opacity: isAnimate ? "1": "0",
        }} className="flex w-full bg-black/50 md:hidden right-0 md:bg-white md:w-[250px] fixed top-0 md:top-20 left-0 h-screen z-10 md:-z-10 border-r-1 border-r-[#ccc]">
            {/* Sidebar */}
            <AnimatePresence>
                <motion.div initial={{
                    x: 0,
                    opacity: 0

                }} animate={{
                    x: isAnimate ? "100" : "0",
                    opacity: isAnimate ? "1" : "0",
                    transition: {
                       duration: 2,
                       type: "tween",
                 
                    }
                }} exit={{
                    opacity: 0,
                    x: 0
                }} className="w-64 bg-white text-black flex flex-col">
                    <div className="flex gap-2 md:hidden p-6 text-2xl font-bold border-b border-b-[#ccc] border-gray-700">
                        <button>
                            <Menu />
                        </button>
                        <h2>
                            Medium
                        </h2>
                    </div>
                    <ul className="flex-1 p-4 space-y-2">
                        <li>
                            <Link href="#" className="flex items-center p-2 rounded hover:bg-[#f1f1f1]">
                                <Home className="w-5 h-5 mr-3" /> Home
                            </Link>
                        </li>
                        <li>

                            <Link href="#" className="flex items-center p-2 rounded hover:bg-[#f1f1f1]">
                                <User className="w-5 h-5 mr-3" /> Profile
                            </Link>
                        </li>
                        <li>

                            <Link href="#" className="flex items-center p-2 rounded hover:bg-[#f1f1f1]">
                                <BookText className="w-5 h-5 mr-3" /> Stories
                            </Link>
                        </li>
                    </ul>
                </motion.div>
            </AnimatePresence>

           </motion.div>
           <motion.div initial={{
              width: 0,
              opacity:0
        }}   animate={{
               width: isAnimate ? "100": "0",
               opacity: isAnimate ? "1": "0",
        }} className="hidden  md:flex md:bg-white !w-[250px] fixed top-20 left-0 h-screen bg-red-500 -z-10 border-r-1 border-r-[#ccc]">
            {/* Sidebar */}
            <AnimatePresence>
                <motion.div initial={{
                    x: 0,
                    opacity: 0

                }} animate={{
                    x: isAnimate ? "100" : "0",
                    opacity: isAnimate ? "1" : "0",
                    transition: {
                       duration: 2,
                       type: "tween",
                 
                    }
                }} exit={{
                    opacity: 0,
                    x: 0
                }} className="w-64 bg-white text-black flex flex-col">
                    <div className="flex gap-2 md:hidden p-6 text-2xl font-bold border-b border-b-[#ccc] border-gray-700">
                        <h2>
                            Medium
                        </h2>
                    </div>
                    <ul className="flex-1 p-4 space-y-2">
                        <li>
                            <Link href="#" className="flex items-center p-2 rounded hover:bg-[#f1f1f1]">
                                <Home className="w-5 h-5 mr-3" /> Home
                            </Link>
                        </li>
                        <li>

                            <Link href="#" className="flex items-center p-2 rounded hover:bg-[#f1f1f1]">
                                <User className="w-5 h-5 mr-3" /> Profile
                            </Link>
                        </li>
                        <li>

                            <Link href="#" className="flex items-center p-2 rounded hover:bg-[#f1f1f1]">
                                <BookText className="w-5 h-5 mr-3" /> Stories
                            </Link>
                        </li>
                    </ul>
                </motion.div>
            </AnimatePresence>
        </motion.div>
        </>
    );
};

export default Sidebar;
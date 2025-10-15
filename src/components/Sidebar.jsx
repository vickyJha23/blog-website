"use client"
import React, { act } from 'react';
import { Menu, Home, User, BookText } from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence, motion } from "framer-motion"



const navItems = [
  {
    name: "Home",
    href: "/dash",
    icon: Home
  },
  {
    name: "Profile",
    href: "/dash/profiles",
    icon: User
  },
  {
    name: "Stories",
    href: "/dash/stories",
    icon: BookText
  }
];


const Sidebar = ({isAnimate = true, handleIsAnimate}) => {
      const [activeIndex, setActiveIndex] = React.useState(() => {
             const savedIndex = localStorage.getItem("sidebarActiveIndex");
            return savedIndex ? parseInt(savedIndex): 0;
      });

      const activeIndexHandler = (index) => {
            setActiveIndex(index); 
            localStorage.setItem("sidebarActiveIndex", index);
      }

    return (
        <>
           <motion.div initial={{
              width: 0,
              opacity:0
        }}   animate={{
               width: isAnimate ? "100%": "0",
               opacity: isAnimate ? 1 : 0,
        }} className="flex w-full bg-black/50 md:hidden right-0 md:bg-white md:w-[250px] fixed top-0 md:top-20 left-0 h-screen z-10 md:-z-10 border-r-1 border-r-[#ccc]">
            {/* Sidebar */}
            <AnimatePresence>
                <motion.div initial={{
                    x: 0,
                    opacity: 0

                }} animate={{
                    x: isAnimate ? "0%" : "-100%",
                    opacity: isAnimate ? 1 : 0,
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
                        {
                             navItems.map(({name, href, icon: Icon}, index) => (<li key={name} onClick={(index) => {
                                   activeIndexHandler(index);
                             }}  className={`${activeIndex === index ? "bg-green-400": ""}`}>
                                <Link href={href} className={`${activeIndex === index ? "bg-green-400": ""}flex items-center p-2 rounded hover:bg-[#f1f1f1]`}>
                                    <Icon className='w-5 h-5 mr-3' /> {name}
                                </Link>
                             </li>))
                        }
                    </ul>
                </motion.div>
            </AnimatePresence>

           </motion.div>
           <motion.div initial={{
              width: 0,
              opacity:0
        }}   animate={{
               width: isAnimate ? "100%": "0",
               opacity: isAnimate ? 1: 0,
        }} className="hidden  md:flex md:bg-white !w-[250px] fixed top-20 left-0 h-screen bg-red-500 z-10 border-r-1 border-r-[#ccc]">
            {/* Sidebar */}
            <AnimatePresence>
                <motion.div initial={{
                    x: 0,
                    opacity: 0

                }} animate={{
                    x: isAnimate ? "0" : "-100%",
                    opacity: isAnimate ? 1 : 0,
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
                             {
                             navItems.map(({name, href, icon: Icon}, index) => (
                             <li key={name}>
                                <Link onClick={() => {
                                  activeIndexHandler(index)
                             }} key={name} className={`rounded hover:bg-[#f1f1f1] ${activeIndex === index ? "bg-green-500 text-white" : "text-black"} flex items-center p-2`} href={href}>
                                    <Icon className='w-5 h-5 mr-3' /> {name}
                                </Link>
                             </li>))
                        }
                    </ul>
                </motion.div>
            </AnimatePresence>
        </motion.div>
        </>
    );
};

export default Sidebar;
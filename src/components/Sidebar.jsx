"use client"
import React, { use, useEffect, useState } from 'react';
import { Menu, Home, User, BookText } from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence, motion } from "framer-motion"
import { navItems } from '../../public/static.js';
import { usePathname } from 'next/navigation.js';

// console.log(navItems);

const Sidebar = ({ isAnimate = true, handleIsAnimate }) => {
    const [activeIndex, setActiveIndex] = useState(() => {
        const savedIndex = localStorage.getItem("sidebarActiveIndex");
        return savedIndex ? parseInt(savedIndex) : 0;
    });
    let pathName = usePathname();
    pathName = pathName.replace("/", "");
    

    const activeIndexHandler = (index) => {
        setActiveIndex(index);
        localStorage.setItem("sidebarActiveIndex", index);
    }
    useEffect(() => {
        const foundIndex = navItems.findIndex(item => item.href.includes(pathName));
        if (foundIndex !== -1) {
            setActiveIndex(foundIndex);
            localStorage.setItem("sidebarActiveIndex", foundIndex);
        }
        else {
               setActiveIndex(0);
               localStorage.setItem("sidebarActiveIndex", 0);
        }
    }, [pathName])





    return (
        <>
            <motion.div animate={{
                width: isAnimate ? "100%" : "0",
                opacity: isAnimate ? 1 : 0,
            }} className='fixed top-0'>
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
                                navItems.map(({ name, href, icon: Icon }, index) => (<li key={name} onClick={(index) => {
                                    activeIndexHandler(index);
                                }} className={`${activeIndex === index ? "bg-green-400" : ""}`}>
                                    <Link href={href} className={`${activeIndex === index ? "bg-green-400" : ""}flex items-center p-2 rounded hover:bg-[#f1f1f1]`}>
                                        <Icon className='w-5 h-5 mr-3' /> {name}
                                    </Link>
                                </li>))
                            }
                        </ul>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
            <motion.div className="hidden  md:flex md:bg-white !w-[250px] fixed top-20 left-0 h-screen bg-red-500 z-10 border-r-1 border-r-[#ccc]">
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
                                navItems.map(({ name, href, icon: Icon }, index) => (
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
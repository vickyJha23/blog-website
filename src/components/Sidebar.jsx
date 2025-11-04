"use client";

import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "../../public/static.js";
import { usePathname } from "next/navigation.js";

const Sidebar = ({ isAnimate = true, handleIsAnimate }) => {
  const [activeIndex, setActiveIndex] = useState(() => {
    const savedIndex = localStorage.getItem("sidebarActiveIndex");
    return savedIndex ? parseInt(savedIndex) : 0;
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathName = usePathname()?.replace("/", "") || "";
  console.log(pathName);
  useEffect(() => {
    const foundIndex = navItems.findIndex((item) => item.href.includes(pathName));
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
      localStorage.setItem("sidebarActiveIndex", foundIndex);
    } else {
      setActiveIndex(0);
      localStorage.setItem("sidebarActiveIndex", 0);
    }
  }, [pathName]);

  const activeIndexHandler = (index) => {
    setActiveIndex(index);
    localStorage.setItem("sidebarActiveIndex", index);
    setIsMobileOpen(false); 
  };

  return (
    <>
      {/* ✅ Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-white flex items-center justify-between px-4 border-b border-gray-300 z-40">
        <h2 className="text-2xl font-bold">Medium</h2>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ✅ Mobile Sidebar (Animated Overlay) */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Overlay background */}
            <motion.div
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* Sidebar content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-40 flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-300">
                <h2 className="text-xl font-bold">Medium</h2>
                <button onClick={() => setIsMobileOpen(false)}>
                  <X size={22} />
                </button>
              </div>
              <ul className="flex-1 overflow-y-auto p-4 space-y-2">
                {navItems.map(({ name, href, icon: Icon }, index) => (
                  <li key={name}>
                    <Link
                      href={href}
                      onClick={() => activeIndexHandler(index)}
                      className={`flex items-center p-2 rounded-md transition ${
                        activeIndex === index
                          ? "bg-green-500 text-white"
                          : "text-black hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" /> {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ✅ Desktop Sidebar */}
      <motion.div
        animate={{
          x: isAnimate ? "0" : "-100%",
          opacity: isAnimate ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex flex-col fixed top-20 left-0 w-[250px] h-screen border-r border-gray-300 bg-white z-20"
      >
        {/* <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold">Medium</h2>
        </div> */}
        <ul className="flex-1 p-4 space-y-2">
          {navItems.map(({ name, href, icon: Icon }, index) => (
            <li key={name}>
              <Link
                href={href}
                onClick={() => activeIndexHandler(index)}
                className={`flex items-center p-2 rounded-md transition ${
                  activeIndex === index
                    ? "bg-green-500 text-white"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" /> {name}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default Sidebar;

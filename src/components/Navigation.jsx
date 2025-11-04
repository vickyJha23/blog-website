"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, NotebookPen, X } from "lucide-react";
import Image from "next/image";
import avatar from "../../public/images/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setModalStatus,
  setLogoutButtonStatus,
} from "@/store/features/users/user.slice";
import { LogoutDropdown } from "./LogoutDropdown";

const Navigation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathName = usePathname();
  
  
  const isLogoutButtonActive = useSelector(
         (state) => state.user.isLogoutButtonActive
  );
  console.log(isLogoutButtonActive, "c");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (eventTriggeredBy = "") => {
    const token = localStorage.getItem("accessToken");
    if (!token) return dispatch(setModalStatus(true));
    return eventTriggeredBy === "write"
      ? router.push("/dash/write-post")
      : router.push("/dash");
  };

 
  if (pathName === "/") {
    return (
      <nav className="fixed top-0 left-0 z-20 w-full h-20 border-b border-black bg-white flex justify-between items-center px-4 sm:px-6 md:px-10">
        <h2 className="font-bold text-2xl sm:text-3xl text-black">Medium</h2>

       
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6 text-black text-base">
            <li
              className="cursor-pointer hover:underline"
              onClick={() => handleNavigation("write")}
            >
              Write
            </li>
            <li
              classNamea="cursor-pointer hover:underline"
              onClick={() => dispatch(setModalStatus(true))}
            >
              Sign in
            </li>
          </ul>
          <button
            onClick={() => handleNavigation()}
            className="bg-black hover:bg-gray-900 text-white px-5 py-2 rounded-3xl text-sm transition"
          >
            Get Started
          </button>
        </div>

        
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="text-black"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-white border-t border-gray-200 flex flex-col items-center py-4 gap-4 md:hidden shadow-lg">
            <button
              onClick={() => handleNavigation("write")}
              className="text-black text-lg hover:underline"
            >
              Write
            </button>
            <button
              onClick={() => dispatch(setModalStatus(true))}
              className="text-black text-lg hover:underline"
            >
              Sign in
            </button>
            <button
              onClick={() => handleNavigation()}
              className="bg-black hover:bg-gray-900 text-white px-6 py-2 rounded-3xl text-sm transition"
            >
              Get Started
            </button>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 z-30 w-full h-20 bg-white border-b border-gray-200 flex justify-between items-center px-4 sm:px-6 md:px-10">
            <div className="flex items-center gap-3 sm:gap-4">
        
        <button className="md:hidden text-black">
          <Menu size={22} />
        </button>

        <h2 className="font-bold text-2xl sm:text-3xl text-black">Medium</h2>

        
        <div className="hidden md:flex ml-5 items-center">
          <input
            type="text"
            placeholder="Search"
            className="text-black placeholder:text-gray-500 px-3 py-2 w-[200px] border border-gray-300 rounded-tl-[20px] rounded-bl-[20px] outline-none focus:ring focus:ring-blue-100"
          />
          <button className="bg-black py-3 px-3 rounded-tr-[20px] rounded-br-[20px]">
            <Search color="white" size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        
        <button className="flex md:hidden text-black">
          <Search size={22} />
        </button>

        
        <Link
          href="/dash/write-post"
          onClick={() => handleNavigation("write")}
          className="hidden md:flex items-center text-black text-sm sm:text-base font-semibold gap-2"
        >
          <NotebookPen size={20} />
          <span>Write</span>
        </Link>

        
        <div className="relative w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] rounded-full cursor-pointer">
          <Image
            src={avatar}
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full"
            onClick={() => dispatch(setLogoutButtonStatus())}
          />
          
          {isLogoutButtonActive && (
            <div className="absolute top-0 -right-15">
               <LogoutDropdown />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

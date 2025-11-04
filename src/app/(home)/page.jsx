"use client";

import React from "react";
import Link from "next/link";
import Modal from "@/components/Modal";
import Image from "next/image";
import heroImg from "../../../public/images/hero.png";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { isModalActive } = useSelector((state) => state.user);

  return (
    <main
      className="
        flex flex-col-reverse md:flex-row items-center justify-center
        min-h-[calc(100vh-60px)] 
        w-full mx-auto 
        px-4 sm:px-6 md:px-10 lg:px-16 
        overflow-hidden
        text-center md:text-left
      "
    >
      {/* Left Section (Text) */}
      <div
        className="
          flex-1 flex flex-col justify-center 
          mt-10 md:mt-0 
          gap-6 sm:gap-8 
          max-w-lg sm:max-w-2xl
        "
      >
        <h1
          className="
            text-black font-extrabold leading-tight 
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
            tracking-tight
          "
        >
          Human <br />
          stories <br className="md:hidden" /> & ideas
        </h1>

        <p
          className="
            text-gray-700 
            text-base sm:text-lg md:text-xl 
            leading-relaxed
          "
        >
          A place to read, write and deepen your understanding.
        </p>

        <div className="flex justify-center md:justify-start">
          <Link href="/dash">
            <button
              className="
                bg-blue-600 hover:bg-blue-700 
                text-white font-semibold 
                px-6 sm:px-8 py-2.5 sm:py-3 
                rounded-lg shadow-md 
                transition-all duration-300
              "
            >
              Start Reading
            </button>
          </Link>
        </div>
      </div>

      {/* Right Section (Hero Image) */}
      <div
        className="
          hidden md:flex justify-center items-center 
          w-full md:w-1/2 
          mb-10 md:mb-0
        "
      >
        <Image
          alt="Hero"
          src={heroImg}
          sizes="100vw"
          className="
            w-64 sm:w-80 md:w-[28rem] lg:w-[34rem] 
            h-auto object-contain 
          "
          priority
        />
      </div>

      {/* Modal (if active) */}
      {isModalActive && <Modal />}
    </main>
  );
};

export default HomePage;

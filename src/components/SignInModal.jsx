"use client";
import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setModalStatus } from "@/store/features/modal/modal.slice";
import { useSelector } from "react-redux";
import { loginUserThunk } from "@/store/features/users/userThunk";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";


const SignInModal = ({handleSignInAndSignUp }) => {
  const { isLoading, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

console.log(user);
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
          const response = await dispatch(loginUserThunk(formData)).unwrap();
           toast.success(response.message);
           console.log(response);
           setFormData({
               email: "",
               password: ""
           })
           setTimeout(() => {
               dispatch(setModalStatus(false));
               router.push("/dash");
           }, 2000)
      } catch (error) {
           toast.error(error.message || "login failed");
      } 
  };




  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-8"
    >
      {/* Close Button */}
      <button
        onClick={() => dispatch(setModalStatus(false))}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Sign In
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-600 text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none text-black"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none text-black"
          />
        </div>

        <button disabled={isLoading}
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 rounded-lg transition"
        >
            { isLoading ? "Sigining": "Sign in"}
        </button>

        <p className="text-sm text-center select-none text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span onClick={handleSignInAndSignUp} className="text-amber-500 hover:underline cursor-pointer">
            Sign Up
          </span>
        </p>
      </form>
    </motion.div>
  )
}

export default SignInModal
"use client";
import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { addUserToStore, setModalStatus } from "@/store/features/users/user.slice";


const SignInModal = ({handleSignInAndSignUp }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
     e.preventDefault();
     mutation.mutate(formData);    
   };


  const mutation = useMutation({
      mutationFn: async (formData) => {
           try {
               console.log("form----");
              const response = await axiosInstance.post("auth/login", formData);
              return response.data;
           } catch (error) {
                console.log(error);
              //  throw error;
           }
      },
      onSuccess: (data) => {
        console.log("Data", data);   
        if(data && data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            dispatch(setModalStatus(!data.status));
            dispatch(addUserToStore(data.user));
           toast.success(data.message);
           setTimeout(() => {
               router.push("/dash")
            }, 3000)
           }
       },

      onError: (error) => {
          console.log(error);
           toast.error(error.message || "Something went wrong while loggin !")
       }

  })



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
          <label className="labelBaseStyle">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="inputBaseStyle"
          />
        </div>

        <div>
          <label className="labelBaseStyle">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="inputBaseStyle"
          />
        </div>

        <button disabled={mutation.isPending}
          type="submit"
          className="btnSecondary"


        >
            { mutation.isPending ? "Sigining": "Sign in"}
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
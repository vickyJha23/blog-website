"use client";
import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useState } from "react";

const SignInModal = ({handleIsLoggedIn, handleSignInAndSignUp}) => {
        const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    

       const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In Data:", formData);
    onClose?.();
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
              onClick={handleIsLoggedIn}
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
    
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 rounded-lg transition"
              >
                Sign In
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
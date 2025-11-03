"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { addUserToStore, setModalStatus } from "@/store/features/users/user.slice";
import { isPending } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";


const SignUpModal = ({ handleSignInAndSignUp }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("password does not match");
      return;
    }
    mutation.mutate(formData);
  };


  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosInstance.post("auth/register", {
        userName: formData.name,
        email: formData.email,
        password: formData.password,
        role: "user"
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data) {
        console.log(data);
        dispatch(addUserToStore(data.user));
        dispatch(setModalStatus(false))
        toast.success(data.message);
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message)
    }
  });

  return (
    <section className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
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
          Create Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="labelBaseStyle">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="inputBaseStyle"
            />
          </div>

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
              placeholder="Enter password"
              required
              className="inputBaseStyle"
            />
          </div>

          <div>
            <label className="labelBaseStyle">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              required
              className="inputBaseStyle"
            />
          </div>

          <button disabled={mutation.isPending}
            type="submit"
            className="btnSecondary"
          >
            {mutation.isPending ? "Registering..." : "Register"}
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span disabled={mutation.isPending}
              className="text-amber-500 hover:underline cursor-pointer"
              onClick={handleSignInAndSignUp}
            >
              sign in
            </span>
          </p>
        </form>
      </motion.div>
    </section>
  );
};

export default SignUpModal;

"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setModalStatus } from "@/store/features/modal/modal.slice";
import { registerUserThunk } from "@/store/features/users/userThunk";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


const SignUpModal = ({ handleSignInAndSignUp }) => {
     const formRef = useRef(null);
     const {isLoading, user} = useSelector((state) => state.user );
     const dispatch = useDispatch();
      


     console.log(user);

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
      try {
           const response = await dispatch(registerUserThunk({
              userName: formData.name,
              email: formData.email,
              password: formData.password,
              role: "user"
           })).unwrap();
            toast.success(response.message);
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
            setTimeout(() => {
               dispatch(setModalStatus(false))
            }, 2000)
        
      } catch (error) {
           toast.error(error.message || "registration failed")
      }
  };
  

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
            <label className="block text-gray-600 text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none text-black"
            />
          </div>

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
              placeholder="Enter password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none text-black"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none text-black"
            />
          </div>

          <button disabled={isLoading}
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 rounded-lg transition"
          >
            {isLoading ? "registering..." : "register"};
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span disabled={isLoading}
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

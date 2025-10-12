"use client";
import React from "react";
import { useCallback, useState } from "react";

import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

const Modal = ({ handleIsLoggedIn }) => {
    const [isSignIn, setIsSignIn] = React.useState(true);
 
    const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


   const handleSignInAndSignUp = useCallback(() => {
          setIsSignIn((prevState) => !prevState);  
     }, [])


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In Data:", formData);
    onClose?.();
  };

  return (
    <section className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      {isSignIn ? (<SignInModal handleIsLoggedIn={handleIsLoggedIn} handleSignInAndSignUp={handleSignInAndSignUp}  />) : (<SignUpModal handleIsLoggedIn={handleIsLoggedIn}  handleSignInAndSignUp={handleSignInAndSignUp}/>)}
    </section>
  );
};

export default Modal;

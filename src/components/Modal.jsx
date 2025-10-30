"use client";
import React from "react";
import { useCallback, useState } from "react";

import SignInModal from "../auth/SignInModal";
import SignUpModal from "../auth/SignUpModal";

const Modal = () => {
    const [isSignIn, setIsSignIn] = React.useState(true);
 
   const handleSignInAndSignUp = useCallback(() => {
          setIsSignIn((prevState) => !prevState);  
     }, [])

  return (
    <section className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      {isSignIn ? (<SignInModal  handleSignInAndSignUp={handleSignInAndSignUp}  />) : (<SignUpModal handleSignInAndSignUp={handleSignInAndSignUp}/>)}
    </section>
  );
};

export default Modal;

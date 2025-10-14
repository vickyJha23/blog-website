"use client";
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

// import {Navigatte}


const ProtectRoute = ({ children }) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = React.useState(false);

    useEffect(() => {
          const token = localStorage.getItem("accessToken");
          if(!token) {
               return router.push("/");
          }
          else {
                setIsAuthorized(true);
          }
    }, [router])

    if(!isAuthorized) {
          return null;
    }

    return (
          <>
             {children}
         </>
    )
}

export default ProtectRoute
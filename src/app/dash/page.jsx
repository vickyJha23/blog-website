"use client"
import React from 'react'

import Sidebar from '@/components/Sidebar'


const page = () => {
   const [isAnimate, setIsAnimate] = React.useState(false);

    const handleIsAnimate = () => {
          setIsAnimate((prev) => !prev);
    }

  return (
    <div>
       <Sidebar handleIsAnimate={handleIsAnimate} />

    </div>
  )
}


export default page
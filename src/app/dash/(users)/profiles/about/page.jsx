import React from 'react'

const page = () => {
  return (
    <div className='w-full text-black bg-gray-300 py-6 px-4 h-full flex items-center flex-col gap-6 rounded'>
          <h4 className='text-center font-bold'>
               Tell the world about yourself
          </h4>
          <p className='max-w-lg text-center text-sm'>
            Here’s where you can share more about yourself: your history, work experience, accomplishments, interests, dreams, and more. You can even add images and use rich text to personalize your bio.
          </p>
          <button className='border-1 border-black px-6 py-2 rounded-3xl'>
               Get Started            
          </button>
    </div>
  )
}

export default page

import Navbar from '@/components/Navbar'
import Profile from '@/components/Profile'
import React from 'react'

const page = () => {
  return (
    <>
      <div className='p-10 md:flex lg:flex justify-center'>
        <Profile />

      </div>
      <Navbar />
    </>
  )
}

export default page

import React from 'react'
import dynamic from "next/dynamic"

const Logo = dynamic(() => import("../components/Logo"))

const XHeader = () => {
  return (
    <div className='flex justify-center p-2 pt-5'>
      <Logo />
    </div>
  )
}

export default XHeader

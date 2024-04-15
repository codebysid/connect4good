"use client"
import React from 'react'
import { Button } from "../components/ui/button"
import { userLogout } from '@/actions/User'
import { useRouter } from 'next/navigation'

const Logout = () => {
  const router = useRouter()
  const handleLogout = async () => {
    try {
      const res = await userLogout()
      if (res.status === 200) router.push("/login")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Button onClick={handleLogout}>Logout</Button>
  )
}

export default Logout

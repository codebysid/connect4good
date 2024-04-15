"use client"

import { useContext } from "react"
import { UserProviderContext } from "../context/UserProvider"
const useUserData = () => {
  const userDetails = useContext(UserProviderContext)

  return userDetails
}

export default useUserData

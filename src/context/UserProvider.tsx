'use client'
import React, { ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react'

interface User {
  email: string;
  role: string;
  _id: string;
  socials: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}

type UserContextType = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

export const UserProviderContext = createContext<UserContextType>({
  user: { role: "", email: "", _id: "", socials: { linkedin: "", twitter: "", github: "" } },
  setUser: () => { }, // dummy function
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({ email: "", role: "", _id: "", socials: { linkedin: "", twitter: "", github: "" } })

  const values = {
    user, setUser
  }

  return (
    <UserProviderContext.Provider value={values}>
      {children}
    </UserProviderContext.Provider>
  )
}

export default UserProvider

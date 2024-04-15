"use client"
import { Flame, User } from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function Navbar() {
  const pathName = usePathname()
  return (
    <div className='relative'>
      <div className='flex flex-row bg-secondary-foreground fixed bottom-0 w-full text-secondary'>
        <div className='flex-1 flex justify-center items-center'>
          <Link href='/dash'>
            <Flame className={`navItemIcon ${pathName === "/dash" && "text-primary"}`} />
          </Link>
        </div>
        <div className='flex-1 flex justify-center items-center'>
          <Link href='/profile'>
            <User className={`navItemIcon ${pathName === "/profile" && "text-primary"}`} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar

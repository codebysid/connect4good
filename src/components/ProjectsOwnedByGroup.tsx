"use client"
import React, { } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { ChevronRight } from 'lucide-react'
import useUserData from '@/hooks/useUserData'

const ProjectsOwnedByGroup = () => {
  const { user } = useUserData()
  return (
    <div>
      {
        user.role === "group" && <Button variant="outline" asChild><Link href={`/profile/${user._id}`}>My Published Projects <ChevronRight /></Link></Button>
      }
    </div>
  )
}

export default ProjectsOwnedByGroup

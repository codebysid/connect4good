"use client"
import useUserData from '@/hooks/useUserData'
import { Star } from 'lucide-react'
import React from 'react'
import { TProject } from "../types/Projects"
import ViewInterestedUsers from './ViewInterestedUsers'
import { Button } from './ui/button'

const ProjectCard = ({ title, description, role, theme, _id, isInterest, viewInterestedUsers }: TProject) => {
  const { user } = useUserData()

  const handleInterest = async () => {
    try {
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='md:flex-1 lg:flex-1 md:w-[50%] lg:w-[50%] border border-secondary-foreground p-4 rounded-xl'>
      <h1 className='text-xl font-bold'>{title}</h1>
      <p>Looking for <span className='font-bold'>{role}</span></p>
      <p>Project is about <span className='font-bold'>{theme}</span></p>
      <p>description: {description}</p>
      {
        user.role === "user" && !isInterest && <Button onClick={handleInterest} className='flex flex-row items-center gap-2'>
          Show Interest<Star size={20} />
        </Button>
      }
      {
        user.role === "group" && viewInterestedUsers && _id && <ViewInterestedUsers projectId={_id} />
      }

    </div>
  )
}

export default ProjectCard

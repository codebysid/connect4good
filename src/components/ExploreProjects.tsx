"use client"
import Project from '@/models/Projects'
import React, { useEffect, useState } from 'react'
import ProjectCategory from './ProjectCategory'
import { fetchAllprojects, isProjectLikedByUser } from '@/actions/Projects'
import useUserData from '@/hooks/useUserData'

const ExploreProjects = () => {
  const [allProjects, setAllProjects] = useState()
  const { user } = useUserData()
  const handleGetProjects = async () => {
    try {
      if (user.role === "group") {
        const res = await fetchAllprojects()
        setAllProjects(res.projects)
        return
      }
      if (user.role === "user") {
        const res = await isProjectLikedByUser(user._id)
        setAllProjects(res.projects)
        return
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    handleGetProjects()
  }, [])
  return (
    <div className=' flex flex-col md:items-center lg:items-center w-full'>
      <ProjectCategory category='Social Media Managers' data={allProjects} />
      <ProjectCategory category='Technical Role' data={allProjects} />
      <ProjectCategory category='Volunteers' data={allProjects} />
      <ProjectCategory category='Project Managers' data={allProjects} />
    </div>
  )
}

export default ExploreProjects

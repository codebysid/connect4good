"use client"
import { fetchAllInterstedProjectsByUser } from '@/actions/Interest'
import { fetchAllProjectsOwnedByGroup } from '@/actions/Projects'
import ProjectCard from '@/components/ProjectCard'
import { TProject } from '@/types/Projects'
import React, { useEffect, useState } from 'react'

const page = ({ params }: { params: { userId: string } }) => {
  const [allProjects, setAllProjects] = useState<[TProject]>()

  const tmpUserId = params.userId.includes("user") && params.userId.split("user")[0]
  const getProjects = async () => {
    try {
      if (tmpUserId) {
        const res = await fetchAllInterstedProjectsByUser(tmpUserId)
        if (res.status === 200) {
          setAllProjects(res?.allProjects)
          return
        }
      }
      const res = await fetchAllProjectsOwnedByGroup(params.userId)
      if (res.status === 200) {
        setAllProjects(res.allProjects)
        return
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (<div className='p-10 md:flex lg:flex flex-wrap justify-center gap-4'>
    {
      allProjects && allProjects.map((ele, key) => {
        return <ProjectCard key={key} _id={ele._id} title={ele.title} description={ele.description} role={ele.role} theme={ele.theme} isInterest viewInterestedUsers={true} />
      })
    }
  </div>)
}

export default page

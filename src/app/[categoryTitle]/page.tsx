import ProjectCard from '@/components/ProjectCard'
import Project from '@/models/Projects'
import React from 'react'

const page = async ({ params }: { params: { categoryTitle: string } }) => {
  const res = await Project.find({ role: params.categoryTitle.split("%20").join(" ") })
  return (
    <div className='p-10'>{
      res.map((ele, key) => {
        return <ProjectCard key={key} title={ele.title} description={ele.description} role={ele.role} theme={ele.theme} _id={ele._id} />
      })
    }</div>
  )
}

export default page

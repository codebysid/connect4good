import { TProject } from '@/types/Projects'
import Link from 'next/link'
import ProjectCard from './ProjectCard'
import { Button } from './ui/button'

const ProjectCategory = ({ category, data }: { category: string, data: any }) => {
  return (
    <div className='flex flex-col md:w-2/6 lg:w-2/6 gap-2'>{
      data?.filter((ele: any) => ele.role.toLowerCase() === category.toLowerCase()).map((ele: any, key) => {
        if (key === 3) return
        return <ProjectCard key={key} _id={ele._id} title={ele.title} description={ele.description} role={ele.role} theme={ele.theme} />
      })
    }
      {
        data?.length > 0 && <Button variant="outline" className='mb-3 md:w-2/6 lg:w-2/6' asChild>
          <Link href={`/${category}`}>
            Show More
          </Link>
        </Button>

      }
    </div>
  )
}

export default ProjectCategory

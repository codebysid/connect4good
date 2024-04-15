import Link from 'next/link'
import React from 'react'
import { Button } from "../components/ui/button"
import useUserData from '@/hooks/useUserData'
import { ChevronRight } from 'lucide-react'

const ProjectInterestedByUser = () => {
  const { user } = useUserData()
  return (
    <div>
      {
        user.role === "user" &&

        <Button variant="outline" asChild>
          <Link href={`/profile/${user._id + "user"}`}>My Interested Projects <ChevronRight /></Link>
        </Button>}
    </div>

  )
}

export default ProjectInterestedByUser

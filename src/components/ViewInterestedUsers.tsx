"use client"
import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { fetchInterestedUsersForGroups } from '@/actions/Projects'

type TUser = {
  name: string,
  socials?: {
    linkedin?: string,
    github?: string,
    twitter?: string
  }
}

type TInterest = {
  user_info: TUser[]
}
const ViewInterestedUsers = ({ projectId }: { projectId: string }) => {
  const [users, setUsers] = useState<TUser[]>()
  const handleGetUsers = async () => {
    try {
      const res = await fetchInterestedUsersForGroups(projectId)
      if (res.status === 200) {
        setUsers(res.interestedUsers)
        return
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    handleGetUsers()

  }, [])
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild><Button>View Interested Users</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Interested Users</DialogTitle>
            <div className=' flex flex-col gap-3'>
              {
                users && users?.length > 0 ? users?.map((ele: TInterest) => {
                  return ele.user_info.map((ele2: TUser, key: number) => {
                    return <div key={key} className=' border border-secondary-foreground rounded-xl md:p-4 lg:p-4'>
                      <p>{ele2.name}</p>
                      {
                        ele2?.socials?.linkedin && <p>Linkedin:<span>{ele2?.socials?.linkedin}</span></p>
                      }
                      {
                        ele2?.socials?.github && <p>Github:<span>{ele2?.socials?.github}</span></p>
                      }
                      {
                        ele2?.socials?.twitter && <p>Twitter:<span>{ele2?.socials?.twitter}</span></p>
                      }
                    </div>
                  })
                }) : <p>No users yet</p>
              }
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ViewInterestedUsers

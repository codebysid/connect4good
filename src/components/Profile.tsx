"use client"
import useUserData from '@/hooks/useUserData'
import { Label } from '../components/ui/label'
import { Input } from "../components/ui/input"
import React from 'react'
import AddSocials from './AddSocials'
import Logout from './Logout'
import ProjectsOwnedByGroup from './ProjectsOwnedByGroup'
import ProjectInterestedByUser from './ProjectInterestedByUser'

const Profile = () => {
  const { user } = useUserData()
  return (
    <div className='flex flex-col gap-4 md:w-2/6 lg:w-2/6'>
      <div>
        <Label>E-mail:</Label>
        <Input value={user.email} readOnly />
      </div>
      <div>
        <Label>Role:</Label>
        <Input value={user.role} readOnly />
      </div>
      <div>
        {
          <AddSocials />
        }
      </div>
      <ProjectsOwnedByGroup />
      <ProjectInterestedByUser />
      <Logout />
    </div>
  )
}

export default Profile

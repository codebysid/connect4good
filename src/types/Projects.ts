import { ObjectId } from "mongoose"

export const projectRoleRequired = [
  {
    id: 1,
    title: "Project Managers"
  },
  {
    id: 2,
    title: "Volunteers"
  },
  {
    id: 3,
    title: "Social Media Managers"
  },
  {
    id: 4,
    title: "Technical Role"
  }
]

export type TProject = {
  title: string,
  description: string,
  role: string,
  theme: string,
  owner?: ObjectId,
  _id?: string,
  isInterest?: boolean,
  viewInterestedUsers?: any,
}

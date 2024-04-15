"use server"
import mongoose, { ObjectId } from "mongoose"
import Project from "../models/Projects"
import { projectRoleRequired } from "@/types/Projects"
import Interest from "@/models/Interest"

export async function saveProject(formData: { title: string, theme: string, role: string, description: string }, _id: string) {
  if (!formData.title || !formData.theme || !formData.role || !formData.description || !_id) return JSON.parse(JSON.stringify({ status: 404, err: "provide all details" }))
  const ownerId = new mongoose.Types.ObjectId(_id)
  try {
    const res = await Project.create({ ...formData, owner: ownerId })
    console.log(res)

    return JSON.parse(JSON.stringify({ status: 200, msg: "Project Published" }))
  } catch (err) {
    console.log(err)
  }

}

export async function fetchAllProjectsOwnedByGroup(owner: string) {
  if (!owner) return JSON.parse(JSON.stringify({ status: 404, err: "Pls login" }))
  const ownerId = new mongoose.Types.ObjectId(owner)
  try {
    const allProjects = await Project.find({ owner: ownerId })

    return JSON.parse(JSON.stringify({ status: 200, msg: "All projects fetched successfully", allProjects }))
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function isProjectLikedByUser(user: string) {
  if (!user) return JSON.parse(JSON.stringify({ status: 404, err: "Login pls" }))

  const userId = new mongoose.Types.ObjectId(user)
  try {
    const allProjects = await Project.aggregate([
      {
        $lookup: {
          from: "interests",
          localField: "_id",
          foreignField: "project",
          as: "interest_info"
        }
      }
    ])
    const projects = allProjects.filter((ele) => {
      return ele?.interest_info?.some((ele2: any) => ele2?.interestedBy?.equals(userId))
    })
    console.log(projects, allProjects)
    return JSON.parse(JSON.stringify({ status: 200, msg: "Success", ...(projects.length > 0 && { projects }), ...(projects.length! >= 0 && { projects: allProjects }) }))
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function fetchAllprojects() {
  try {
    const projects = await Project.find()
    return JSON.parse(JSON.stringify({ status: 200, msg: "Successfull", projects }))
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function fetchInterestedUsersForGroups(project: string) {
  if (!project) return JSON.parse(JSON.stringify({ status: 404, err: "project id required" }))
  const projectId = new mongoose.Types.ObjectId(project)
  try {
    console.log("fetch")
    const interestedUsers = await Interest.aggregate(
      [
        {
          $match: {
            project: projectId
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "interestedBy",
            foreignField: "_id",
            as: "user_info"
          }
        }
      ])
    console.log(interestedUsers)
    return JSON.parse(JSON.stringify({ status: 200, msg: "Success", interestedUsers }))
  } catch (err) {
    console.log(err)
    throw err
  }

}


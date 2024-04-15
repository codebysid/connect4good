"use server"

import Interest from "@/models/Interest";
import mongoose from "mongoose";

export async function showInterestToProject(project: string, interestBy: string) {
  if (!project || !interestBy) return JSON.parse(JSON.stringify({ status: 404, err: "Provid all id's" }))
  const projectId = new mongoose.Types.ObjectId(project)
  const interestById = new mongoose.Types.ObjectId(interestBy)

  try {
    const res = await Interest.create({ project: projectId, interestedBy: interestById })
    if (res) {
      return JSON.parse(JSON.stringify({ status: 200, msg: "Interest saved" }))
    }

  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function fetchAllInterstedProjectsByUser(user: string) {
  if (!user) return JSON.parse(JSON.stringify({ status: 404, err: "provide user id" }))
  const userId = new mongoose.Types.ObjectId(user)

  try {
    const allProjects = await Interest.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "interestedBy",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $lookup: {
          from: "projects",
          localField: "project",
          foreignField: "_id",
          as: "project_info"
        }
      },
      {
        $match: {
          "interestedBy": userId,
        }
      },
      {
        $project: {
          allProjects: "$project_info",
          user: "$user"
        }
      }
    ])
    if (!allProjects) return JSON.parse(JSON.stringify({ status: 404, err: "No projects foundd" }))

    const mergedProjects = allProjects.reduce((accumulator, current) => {
      return accumulator.concat(current.allProjects);
    }, []);

    return JSON.parse(JSON.stringify({ status: 200, msg: "all projects fetched succsesfullt", allProjects: mergedProjects }))
  } catch (err) {
    console.log(err)
    throw err
  }
}

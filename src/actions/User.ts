"use server"

import User from "@/models/User"
import { generateJwt } from "@/utils/jwt"
import { connectToMongo } from "@/utils/mongodb"
import { compareHashWithPassword, convertPasswordToHash } from "@/utils/password"
import mongoose from "mongoose"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function createUser(formData: { email: string, password: string, role: 'user' | 'group', name: string }) {
  const { email, name, password, role } = formData
  if (!email || !name || !password || !role) throw new Error("all form data required")
  try {
    const hashedPassword = await convertPasswordToHash(password)
    await connectToMongo()
    const res = await User.create({
      email, name, password: hashedPassword, role
    })
    if (!res) return
    return JSON.parse(JSON.stringify({ status: 200, msg: "Created" }))

  } catch (err) {
    console.log(err)
  }
}

export async function loginUser(formData: { email: string, password: string }) {
  const { email, password } = formData;
  if (!email || !password) return JSON.parse(JSON.stringify({ status: 404, msg: "Email and Password required" }));

  try {
    await connectToMongo()
    const user = await User.findOne({ email });
    if (!user)
      return JSON.parse(JSON.stringify({ status: 404, msg: "No account found" }))
    const isMatch = await compareHashWithPassword(user.password, password);
    if (!isMatch)
      return JSON.parse(JSON.stringify({ status: 404, msg: "Incorrect password" }));
    const token = generateJwt(user._id);
    cookies().set("access-token", token)
    return JSON.parse(JSON.stringify({ status: 200, email, _id: user._id as string, role: user.role, socials: user.socials }));
  } catch (err) {
    console.log(err);
    return JSON.parse(JSON.stringify({ error: err, status: 500 }));
  }
}


export async function saveUserSocials(formData: { linkedin?: string, github?: string, twitter?: string }, _id: string) {

  if (!formData.twitter && !formData.github && !formData.linkedin) {
    return JSON.parse(JSON.stringify({ err: "Provide atleast one social account", status: 404 }))
  }
  const userId = new mongoose.Types.ObjectId(_id)
  try {
    const user = await User.findOne({ _id: userId })
    const tmp = {
      ...(user?.socials?.twitter && { twitter: user.socials.twitter }),
      ...(user?.socials?.github && { github: user.socials.github }),
      ...(user?.socials?.linkedin && { linkedin: user?.socials.linkedin }),
      ...formData
    }
    await User.updateOne({ _id: userId }, { socials: tmp })
    return JSON.parse(JSON.stringify({ status: 200, msg: "Socials Saved" }))
  } catch (err) {
    console.log(err)
    throw err
  }

}

export async function userLogout() {
  cookies().delete("access-token")
  return JSON.parse(JSON.stringify({ status: 200, msg: "Logout Successfully" }))
}

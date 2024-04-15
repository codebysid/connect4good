import jwt from "jsonwebtoken"
import { ObjectId } from "mongoose"
import { jwtVerify } from "jose"

export function generateJwt(id: ObjectId) {
  const token = jwt.sign({ _id: id }, process.env.JWT_SECRET as string)
  return token
}

export async function verifyJwt(token: any) {
  try {
    if (!token) return null
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
    if (payload._id) return true
    return false
  } catch (err) {
    return false
  }

}

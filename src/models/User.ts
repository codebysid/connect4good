import { Schema, model, models } from "mongoose"

const socialSchema = new Schema({
  linkedin: {
    type: String,
    default: " "
  },
  github: {
    type: String,
    default: " "
  },

  twitter: {
    type: String,
    default: " "
  },
})

const userSchema = new Schema({
  email: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    require: true
  },
  socials: socialSchema
})

const User = models.User || model("User", userSchema)

export default User

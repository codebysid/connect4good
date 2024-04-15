import { Schema, model, models } from "mongoose"

const projectsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true })

const Project = models.Project || model("Project", projectsSchema)
export default Project

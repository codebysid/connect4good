import { Schema, model, models } from "mongoose"

const interestSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project"
  },
  interestedBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

const Interest = models.Interest || model("Interest", interestSchema)
export default Interest

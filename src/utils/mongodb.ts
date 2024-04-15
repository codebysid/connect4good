import mongoose from "mongoose"
export async function connectToMongo() {
  try {
    mongoose.connect(process.env.MONGODB_URL as string).then(() => {
      console.log("connected to mongoDB")
    }).catch((err) => {
      console.log(err)
    })
  } catch (err) {
    console.log(err)
  }
}

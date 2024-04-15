import User from "../../../models/User";
import { compareHashWithPassword } from "../../../utils/password";
import { generateJwt } from "../../../utils/jwt";
import { NextRequest } from "next/server";
import { connectToMongo } from "@/utils/mongodb";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) return new Response(
    JSON.stringify({ error: "Email and Password required" })
  );
  try {
    await connectToMongo()
    const user = await User.findOne({ email });
    if (!user)
      return new Response(JSON.stringify({ error: "No account found" }));
    const isMatch = await compareHashWithPassword(user.password, password);
    if (!isMatch)
      return new Response(JSON.stringify({ error: "Incorrect Password" }));
    const token = generateJwt(user._id);
    cookies().set("access-token", token)
    return new Response(JSON.stringify({ email, _id: user._id, role: user.role }));
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: err }));
  }
}



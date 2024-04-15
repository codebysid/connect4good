import { cookies, headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { verifyJwt } from "./utils/jwt"

const protectedRoutes = ["/dash", "/profile"]

function makeAbsoluteUrl(pathName: string, origin: string) {
  return new URL(pathName, origin).toString()
}

export async function middleware(req: NextRequest) {
  const jwt = cookies().get("access-token")
  if (!jwt && protectedRoutes.includes(req.nextUrl.pathname)) return NextResponse.redirect(makeAbsoluteUrl("/login", req.nextUrl.origin), { headers: headers() })

  const isAuthorised = await verifyJwt(jwt?.value)
  if (!isAuthorised && protectedRoutes.includes(req.nextUrl.pathname)) return NextResponse.redirect(makeAbsoluteUrl("/login", req.nextUrl.origin))


}

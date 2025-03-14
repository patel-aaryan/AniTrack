import { NextRequest, NextResponse } from "next/server"

import { auth } from "./lib/auth"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  if (path.startsWith("/admin")) {
    const session = await auth()

    if (!session || !session?.user?.is_admin) {
      const url = new URL("/", request.url)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin"],
}

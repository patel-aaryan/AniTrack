import { NextResponse } from "next/server"

import { auth } from "@/lib/auth"
import { getAnimeRecommendations } from "@/server/queries/recommendations"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }
    const userId = Number(session.user.id)
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 })
    }
    const result = await getAnimeRecommendations(userId)
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
    return NextResponse.json(result.data)
  } catch (error) {
    console.error("Error in recommendations route:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

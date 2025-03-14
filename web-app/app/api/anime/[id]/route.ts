import { NextRequest, NextResponse } from "next/server"

import { getAnimeById } from "@/server/queries/anime"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "invalid anime ID" },
        { status: 400 }
      )
    }
    const anime = await getAnimeById(id)
    if (!anime) {
      return NextResponse.json(
        { success: false, error: "anime not found" },
        { status: 404 }
      )
    }
    return NextResponse.json({
      success: true,
      data: anime,
    })
  } catch (error) {
    console.error("  fetching anime details:", error)
    return NextResponse.json(
      { success: false, error: "failed to fetch anime details" },
      { status: 500 }
    )
  }
}

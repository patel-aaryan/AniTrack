import { NextRequest, NextResponse } from "next/server"

import { IAnime } from "@/types/anime"
import pool from "@/server/db"

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json()
    const limit = body.limit || 100
    const offset = body.offset || 0

    const { rows } = (await pool.query(
      `
      SELECT *
      FROM anime
      LIMIT $1 OFFSET $2
      `,
      [limit, offset]
    )) as { rows: IAnime[] }

    return NextResponse.json({
      success: true,
      data: rows,
    })
  } catch (error) {
    console.error("Error fetching anime:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch anime data" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const { id, verified } = await request.json()

    await pool.query(
      `
      UPDATE anime
      SET is_verified = $1
      WHERE id = $2
      `,
      [verified, id]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating anime:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update anime" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { id } = await request.json()

    await pool.query(
      `
      DELETE FROM anime
      WHERE id = $1
      `,
      [id]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting anime:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete anime" },
      { status: 500 }
    )
  }
}

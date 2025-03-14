import { NextRequest, NextResponse } from "next/server"

import { IAnime } from "@/types/anime"
import pool from "@/server/db"

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "100", 10)
    const offset = parseInt(searchParams.get("offset") || "0", 10)

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

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "100", 10)
    const offset = parseInt(searchParams.get("offset") || "0", 10)

    const body = await request.json()
    const name = body.name
    const is_verified = body.is_verified

    let query = `SELECT * FROM anime WHERE 1=1`
    const queryParams = []

    if (name !== undefined) {
      queryParams.push(name)
      query += ` AND name = $${queryParams.length}`
    }

    if (is_verified !== undefined) {
      queryParams.push(is_verified)
      query += ` AND is_verified = $${queryParams.length}`
    }

    queryParams.push(limit, offset)
    query += ` LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length}`

    const { rows } = (await pool.query(query, queryParams)) as {
      rows: IAnime[]
    }

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

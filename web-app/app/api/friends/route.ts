import { NextResponse } from "next/server"

import { auth } from "@/lib/auth"
import pool from "@/server/db"

// Add a friend
export async function POST(request: Request) {
  try {
    // Get the current user from the session
    const session = await auth()
    const currentUserId = session?.user?.id

    // If user is not authenticated, return unauthorized
    if (!currentUserId) {
      return NextResponse.json(
        { message: "You must be logged in to add friends" },
        { status: 401 }
      )
    }

    // Get the target user ID from the request body
    const { userId } = await request.json()

    // Validate input
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      )
    }

    // Don't allow adding yourself as a friend
    if (userId === currentUserId) {
      return NextResponse.json(
        { message: "You cannot add yourself as a friend" },
        { status: 400 }
      )
    }

    // Check if the friendship already exists
    const checkResult = await pool.query(
      `
      SELECT * FROM friendship 
      WHERE (user_id1 = $1 AND user_id2 = $2) OR (user_id1 = $2 AND user_id2 = $1)
      `,
      [currentUserId, userId]
    )

    if (checkResult.rowCount && checkResult.rowCount > 0) {
      return NextResponse.json(
        { message: "You are already friends with this user" },
        { status: 409 }
      )
    }

    // Add the friend relationship
    await pool.query(
      `
      INSERT INTO friendship (user_id1, user_id2) 
      VALUES ($1, $2)
      `,
      [currentUserId, userId]
    )

    return NextResponse.json({ message: "Friend added successfully" })
  } catch (error) {
    console.error("Error adding friend:", error)
    return NextResponse.json(
      { message: "Failed to add friend" },
      { status: 500 }
    )
  }
}

// Remove a friend
export async function DELETE(request: Request) {
  try {
    // Get the current user from the session
    const session = await auth()
    const currentUserId = session?.user?.id

    // If user is not authenticated, return unauthorized
    if (!currentUserId) {
      return NextResponse.json(
        { message: "You must be logged in to remove friends" },
        { status: 401 }
      )
    }

    // Get the target user ID from the request body
    const { userId } = await request.json()

    // Validate input
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      )
    }

    // Delete the friendship
    const deleteResult = await pool.query(
      `
      DELETE FROM friendship 
      WHERE (user_id1 = $1 AND user_id2 = $2) OR (user_id1 = $2 AND user_id2 = $1)
      `,
      [currentUserId, userId]
    )

    if (!deleteResult.rowCount || deleteResult.rowCount === 0) {
      return NextResponse.json(
        { message: "Friendship not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Friend removed successfully" })
  } catch (error) {
    console.error("Error removing friend:", error)
    return NextResponse.json(
      { message: "Failed to remove friend" },
      { status: 500 }
    )
  }
}

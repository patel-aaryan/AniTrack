import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth"
import { addReview, getUserReview } from "@/server/queries/reviews"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "You must be logged in to submit a review" },
        { status: 401 }
      )
    }
    const { id } = await params
    const animeId = parseInt(id)
    if (isNaN(animeId)) {
      return NextResponse.json({ message: "Invalid anime ID" }, { status: 400 })
    }
    const { rating, comment } = await request.json()
    if (!rating || rating < 1 || rating > 10) {
      return NextResponse.json(
        { message: "Rating must be between 1 and 10" },
        { status: 400 }
      )
    }
    const userEmail = session.user.email
    if (!userEmail) {
      return NextResponse.json(
        { message: "User email not found" },
        { status: 400 }
      )
    }
    await addReview({
      animeId,
      userEmail,
      rating,
      comment: comment || null,
    })
    return NextResponse.json({ message: "Review submitted successfully" })
  } catch (error) {
    console.error("Error submitting review:", error)
    return NextResponse.json(
      { message: "Failed to submit review" },
      { status: 500 }
    )
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { message: "You must be logged in to get your review" },
        { status: 401 }
      )
    }
    const { id } = await params
    const animeId = parseInt(id)
    if (isNaN(animeId)) {
      return NextResponse.json({ message: "Invalid anime ID" }, { status: 400 })
    }
    const review = await getUserReview(animeId, session.user.email)
    return NextResponse.json(review || { rating: 0, comment: "" })
  } catch (error) {
    console.error("Error getting user review:", error)
    return NextResponse.json(
      { message: "Failed to get user review" },
      { status: 500 }
    )
  }
}

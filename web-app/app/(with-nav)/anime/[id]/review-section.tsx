"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimeReview } from "@/components/anime-review"

interface AnimeReviewSectionProps {
  animeId: number
}

export function AnimeReviewSection({ animeId }: AnimeReviewSectionProps) {
  const { status } = useSession()
  const [userReview, setUserReview] = useState<{
    rating: number
    comment: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserReview = async () => {
      if (status === "authenticated") {
        try {
          const response = await fetch(`/api/anime/${animeId}/reviews`)
          if (response.ok) {
            const data = await response.json()
            setUserReview(data)
          }
        } catch (error) {
          console.error("Error fetching user review:", error)
        } finally {
          setIsLoading(false)
        }
      } else if (status === "unauthenticated") {
        setIsLoading(false)
      }
    }

    fetchUserReview()
  }, [animeId, status])
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40 flex items-center justify-center">
            <p>Loading...</p>
          </div>
        </CardContent>
      </Card>
    )
  }
  if (status === "unauthenticated") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="mb-4">Sign in to leave a review</p>
            <Button asChild>
              <a href="/login">Sign In</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }
  return (
    <AnimeReview
      animeId={animeId}
      initialRating={userReview?.rating || 0}
      initialComment={userReview?.comment || ""}
    />
  )
}

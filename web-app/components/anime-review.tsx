"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Star } from "lucide-react"

import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { useToast } from "./ui/use-toast"

interface AnimeReviewProps {
  animeId: number
  initialRating?: number
  initialComment?: string
}

export const AnimeReview = ({
  animeId,
  initialRating = 0,
  initialComment = "",
}: AnimeReviewProps) => {
  const [rating, setRating] = useState<number>(initialRating)
  const [comment, setComment] = useState<string>(initialComment)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleRatingChange = (newRating: number) => {
    setRating(newRating === rating ? 0 : newRating)
  }

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating between 1 and 10",
        variant: "destructive",
      })
      return
    }
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/anime/${animeId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          comment,
        }),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to submit review")
      }

      toast({
        title: "Review submitted",
        description: "Thank you for your review!",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to submit review",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Rate this anime</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-1">
          {[...Array(10)].map((_, i) => (
            <button
              key={i}
              onClick={() => handleRatingChange(i + 1)}
              className="focus:outline-none"
              aria-label={`Rate ${i + 1} out of 10`}
            >
              <Star
                className={`w-8 h-8 cursor-pointer transition-all ${
                  i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-500">
            {rating > 0 ? `${rating}/10` : "Not rated"}
          </span>
        </div>
        <Textarea
          placeholder="Share your thoughts about this anime (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </CardFooter>
    </Card>
  )
}

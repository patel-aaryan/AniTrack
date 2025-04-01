import Link from "next/link"
import { Star } from "lucide-react"

import { getAnimeReviews } from "@/server/queries/reviews"
import { Avatar } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export async function CommunityReviewSection({ animeId }: { animeId: number }) {
  const reviews = await getAnimeReviews(animeId)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Community Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div
                key={index}
                className="border-b border-gray-200 flex items-start gap-4 pb-4 last:border-0 last:pb-0"
              >
                <Link href={`/user/${review.user_id}`}>
                  <Avatar
                    src={review.user_image || ""}
                    alt={review.user_name}
                  />
                </Link>
                <div>
                  <div className="font-semibold">{review.user_name}</div>
                  <div className="flex items-center mt-1">
                    {renderStarRating(review.rating)}
                    <span className="text-sm text-gray-500 ml-2">
                      {review.rating}/10
                    </span>
                  </div>
                  {review.comment && (
                    <div className="mt-2 text-gray-700">{review.comment}</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              No reviews yet. Be the first to share your thoughts!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Helper function to render star ratings
function renderStarRating(fullStars: number) {
  const emptyStars = 10 - fullStars

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="w-4 h-4 text-yellow-500 fill-current"
        />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  )
}

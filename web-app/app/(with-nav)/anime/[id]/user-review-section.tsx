import { getUserReview } from "@/server/queries/reviews"
import { AnimeReview } from "@/components/anime-review"

interface AnimeReviewSectionProps {
  animeId: number
}

export async function UserReviewSection({ animeId }: AnimeReviewSectionProps) {
  const userReview = await getUserReview(animeId)
  if (userReview.error) {
    return null
  }

  return (
    <AnimeReview
      animeId={animeId}
      initialRating={userReview?.data?.rating || 0}
      initialComment={userReview?.data?.comment || ""}
    />
  )
}

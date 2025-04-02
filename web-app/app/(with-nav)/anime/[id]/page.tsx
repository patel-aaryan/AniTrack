import Image from "next/image"
import { notFound } from "next/navigation"
import { Star } from "lucide-react"

import { getAnimeById, getRelativeRank } from "@/server/queries/anime"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CommunityReviewSection } from "./community-review-section"
import { UserReviewSection } from "./user-review-section"
import { WatchedStatusSection } from "./watched-status-section"

//import { ST } from "next/dist/shared/lib/utils"

export default async function AnimePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await Promise.resolve(params)
  const id = parseInt(resolvedParams.id)
  if (isNaN(id)) {
    notFound()
  }
  const anime = await getAnimeById(id)
  if (!anime) {
    notFound()
  }
  const relativeRanking = await getRelativeRank(id)
  //const hasRanking = (relativeRanking === null) ? false : true;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <div className="relative h-[400px]">
                <Image
                  src={anime.image}
                  alt={anime.name}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {anime.name}
                </h1>
                <div className="flex space-x-4">
                  <Badge variant="secondary" className="text-lg">
                    #{" "}
                    {relativeRanking !== null
                      ? relativeRanking.rating_rank
                      : "N/A"}
                  </Badge>
                  <Badge variant="secondary" className="text-lg">
                    <Star className="w-4 h-4 mr-1 inline-block text-yellow-400 fill-current" />
                    {anime.avg_rating
                      ? (Math.round(anime.avg_rating * 100) / 100).toFixed(2)
                      : "N/A"}
                  </Badge>
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Genres
                </h2>
                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((genre) => (
                    <Badge key={genre.id} variant="outline">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {anime.description}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <WatchedStatusSection animeId={id} />
          <UserReviewSection animeId={id} />
          <CommunityReviewSection animeId={id} />
        </div>
      </div>
    </div>
  )
}

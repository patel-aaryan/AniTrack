import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

import { IAnimePreview } from "@/types/anime"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export const AnimePreview = ({
  id,
  name,
  image_url,
  genres,
  avg_rating,
}: IAnimePreview) => {
  return (
    <Link
      href={`/anime/${id}`}
      className="block transform transition-all duration-200 hover:scale-[1.02]"
    >
      <Card
        key={id}
        className="overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200"
      >
        <div className="relative">
          <Image
            src={image_url}
            alt={name}
            className="w-full h-44 object-cover"
            width={256}
            height={176}
          />
          <div className="absolute top-1 right-1">
            <Badge variant="secondary">
              <Star className="w-3 h-3 mr-1 inline-block text-yellow-400 fill-current" />
              {avg_rating
                ? (Math.round(avg_rating * 100) / 100).toFixed(2)
                : "N/A"}
            </Badge>
          </div>
        </div>
        <CardHeader className="px-3 pt-4 pb-2">
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-1">
          <div className="flex flex-wrap gap-1.5">
            {genres.map((genre) => (
              <Badge key={genre.id} variant="secondary" className="px-1.5 py-0">
                {genre.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

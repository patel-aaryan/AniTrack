import Image from "next/image"
import { Star } from "lucide-react"

import { Card, CardContent } from "./ui/card"

interface AnimeCardWithReviewProps {
  name: string
  image: string
  rating?: number
  review?: string
}

export const AnimeCardWithReview = ({
  name,
  image,
  rating,
  review,
}: AnimeCardWithReviewProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Image
          src={image}
          alt={name}
          className="w-full h-[225px] object-cover"
          width={256}
          height={176}
        />
      </div>
      <CardContent className="p-3">
        <h3 className="font-semibold text-sm line-clamp-1">{name}</h3>
        <div className="flex items-center mt-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${rating && star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
              />
            ))}
          </div>
        </div>
        {review && (
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
            {review}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

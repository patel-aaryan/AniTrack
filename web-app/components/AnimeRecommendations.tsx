"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Recommendation {
  anime_id: number
  anime_name: string
  image_url: string
  predicted_rating: number | string
}

export function AnimeRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch("/api/recommendations")
        if (!response.ok) {
          throw new Error("failed to fetch recommendations")
        }
        const data = await response.json()
        setRecommendations(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "error occurred")
      } finally {
        setLoading(false)
      }
    }
    fetchRecommendations()
  }, [])
  if (loading) {
    return <div className="p-4">Loading recommendations...</div>
  }
  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }
  if (recommendations.length === 0) {
    return (
      <div className="p-4 text-gray-500">
        No recommendations available. Try rating more anime!
      </div>
    )
  }
  return (
    <div className="w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
      <ScrollArea className="h-[600px] rounded-md border p-4">
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <Card key={rec.anime_id} className="flex overflow-hidden">
              <div className="relative w-24 h-32">
                <Image
                  src={rec.image_url}
                  alt={rec.anime_name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <Link
                  href={`/anime/${rec.anime_id}`}
                  className="font-semibold hover:text-blue-600 transition-colors"
                >
                  {rec.anime_name}
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  Predicted Rating: {Number(rec.predicted_rating).toFixed(1)}/10
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

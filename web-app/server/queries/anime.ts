import sql from "../db"

import "server-only"

import { IAnimePreview } from "@/types/anime"

interface IAnimePreviewRaw extends Omit<IAnimePreview, "genres"> {
  genre: string | null
}

export async function getTopAnime(
  limit: number = 100,
  offset: number = 0
): Promise<IAnimePreview[]> {
  const response = (await sql`
SELECT 
  anime.id, 
  anime.name, 
  anime.genre, 
  anime.image_url, 
  AVG(reviews.rating) AS avg_rating
FROM 
    anime
LEFT JOIN 
    reviews ON anime.id = reviews.anime_id
GROUP BY 
    anime.id, anime.name, anime.genre, anime.image_url
ORDER BY 
    avg_rating DESC NULLS LAST
LIMIT ${limit} OFFSET ${offset}
`) as IAnimePreviewRaw[]
  console.log(response)
  // split the genre into an array
  return response.map((anime) => ({
    ...anime,
    genres: anime.genre ? anime.genre.split(",") : [],
  }))
}

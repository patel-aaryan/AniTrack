import pool from "../db"

import "server-only"

import { IAnimePreview } from "@/types/anime"

export async function getTopAnime(
  limit: number = 100,
  offset: number = 0
): Promise<IAnimePreview[]> {
  const { rows } = (await pool.query(
    `
SELECT 
  anime.id, 
  anime.name, 
  anime.image_url AS "imageUrl", 
  AVG(reviews.rating) AS avg_rating,
  COALESCE(
    JSONB_AGG(
      DISTINCT JSONB_BUILD_OBJECT(
        'id', genres.id,
        'name', genres.name
      )
    ) FILTER (WHERE genres.id IS NOT NULL),
    '[]'
  ) AS genres
FROM 
    anime
LEFT JOIN 
    reviews ON anime.id = reviews.anime_id
LEFT JOIN
    anime_genre ON anime.id = anime_genre.anime_id
LEFT JOIN
    genres ON anime_genre.genre_id = genres.id
GROUP BY 
    anime.id, anime.name, anime.image_url
ORDER BY 
    avg_rating DESC NULLS LAST
LIMIT $1 OFFSET $2
`,
    [limit, offset]
  )) as { rows: IAnimePreview[] }

  return rows
}

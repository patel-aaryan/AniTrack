import "server-only"

import { IAnimePreview, WatchedStatus } from "@/types/anime"
import { auth } from "@/lib/auth"
import pool from "../db"

export async function getTopAnime(
  limit: number = 100,
  offset: number = 0
): Promise<IAnimePreview[]> {
  const { rows } = (await pool.query(
    `
SELECT 
  anime.id, 
  anime.name, 
  anime.image_url AS "image", 
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

export interface IAnimeDetails extends IAnimePreview {
  description: string
}

export async function getAnimeById(id: number): Promise<IAnimeDetails | null> {
  const { rows } = await pool.query(
    `
    SELECT 
      anime.id, 
      anime.name,
      anime.description, 
      anime.image_url AS image, 
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
    WHERE
      anime.id = $1 AND anime.is_verified = true
    GROUP BY 
      anime.id, anime.name, anime.description, anime.image_url
    `,
    [id]
  )

  return rows[0] || null
}

export async function getAnimeUserStatus(animeId: number) {
  const session = await auth()
  if (!session) {
    return {
      error: "User not authenticated",
      data: null,
    }
  }
  const userId = session.user.id
  const { rows } = await pool.query(
    `
    SELECT status FROM user_anime_status WHERE anime_id = $1 AND user_id = $2
    `,
    [animeId, userId]
  )

  if (rows.length === 0) {
    return {
      data: null,
    }
  }

  // convert status to enum
  return {
    data: rows[0].status as WatchedStatus,
  }
}

export async function searchAnime(query: string) {
  const { rows } = await pool.query(
    `
    SELECT id, name, description, image_url
    FROM anime
    WHERE to_tsvector('english', name) @@ plainto_tsquery('english', $1) AND is_verified = true
    ORDER BY ts_rank(to_tsvector('english', name), plainto_tsquery('english', $1)) DESC;
    `,
    [query]
  )
  return rows
}

export async function getRelativeRank(id: number) {
  const { rows } = await pool.query(
    `
    WITH anime_aggregates AS (
      SELECT
        reviews.anime_id,
        AVG(reviews.rating) AS average_rating
      FROM reviews
      GROUP BY reviews.anime_id
    ),
    ranked_anime AS (
      SELECT
        anime.id,
        anime.name,
        anime_aggregates.average_rating,
        RANK() OVER (ORDER BY anime_aggregates.average_rating DESC) AS rating_rank
      FROM anime
      JOIN anime_aggregates ON anime.id = anime_aggregates.anime_id
    )
    SELECT rating_rank
    FROM ranked_anime
    WHERE id = $1;


    `,
    [id]
  )

  if (rows.length === 0) {
    return null
  }

  return rows[0]
}

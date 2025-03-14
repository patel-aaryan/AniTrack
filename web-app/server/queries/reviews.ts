import pool from "../db"

import "server-only"

interface ReviewInput {
  animeId: number
  userEmail: string
  rating: number
  comment: string | null
}

interface Review {
  rating: number
  comment: string | null
}

interface AnimeReview extends Review {
  user_name: string
  user_image: string | null
}

// add/update review
export async function addReview({
  animeId,
  userEmail,
  rating,
  comment,
}: ReviewInput): Promise<void> {
  await pool.query(
    `
    WITH user_id_query AS (
      SELECT id FROM users WHERE email = $1
    )
    INSERT INTO reviews (user_id, anime_id, rating, comment)
    SELECT id, $2, $3, $4
    FROM user_id_query
    ON CONFLICT (user_id, anime_id)
    DO UPDATE SET
      rating = $3,
      comment = $4
    `,
    [userEmail, animeId, rating, comment]
  )
}

// get user's review
export async function getUserReview(
  animeId: number,
  userEmail: string
): Promise<Review | null> {
  const { rows } = await pool.query(
    `
    SELECT r.rating, r.comment
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.anime_id = $1 AND u.email = $2
    `,
    [animeId, userEmail]
  )

  return rows[0] || null
}

// get all reviews
export async function getAnimeReviews(animeId: number): Promise<AnimeReview[]> {
  const { rows } = await pool.query(
    `
    SELECT 
      r.rating, 
      r.comment, 
      u.name as user_name,
      u.image as user_image
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.anime_id = $1
    ORDER BY r.rating DESC
    `,
    [animeId]
  )

  return rows
}

// get avg rating
export async function getAnimeAverageRating(
  animeId: number
): Promise<number | null> {
  const { rows } = await pool.query(
    `
    SELECT AVG(rating) as avg_rating
    FROM reviews
    WHERE anime_id = $1
    `,
    [animeId]
  )

  return rows[0]?.avg_rating || null
}

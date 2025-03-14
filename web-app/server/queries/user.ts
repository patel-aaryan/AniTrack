import "server-only"

import { AnimeStatus } from "@/types/anime"
import pool from "../db"

const getUserAnimeCountByStatus = async (
  userId: string,
  status: AnimeStatus
) => {
  const { rows } = await pool.query(
    `SELECT COUNT(*) FROM user_anime_status WHERE user_id = $1 AND status = $2`,
    [userId, status]
  )
  return {
    status,
    count: rows[0].count,
  }
}

/**
 * Get the count of anime for a user of each status
 * @param userId - The user ID
 * @returns An object with the count of anime for each status
 */
export const getUserAnimeCount = async (userId: string) => {
  const statusValues = Object.values(AnimeStatus).filter(
    (value) => typeof value === "number"
  )

  const queryPromises = statusValues.map((status) =>
    getUserAnimeCountByStatus(userId, status)
  )

  const results = await Promise.all(queryPromises)

  return results.reduce(
    (acc, count) => {
      acc[count.status] = count.count
      return acc
    },
    {} as Record<AnimeStatus, number>
  )
}

interface GetUserAnimeByStatusParams {
  userId: string
  status: AnimeStatus
  offset?: number
  limit?: number
}

/**
 * Get the anime for a user of a specific status
 * @param userId - The user ID
 * @param status - The status of the anime
 * @returns An array of anime with the user's rating and comment
 */
export const getUserAnimeByStatus = async ({
  userId,
  status,
  offset = 0,
  limit = 20,
}: GetUserAnimeByStatusParams) => {
  const { rows } = await pool.query(
    `
      SELECT anime.name AS name, anime.id AS id, anime.image_url AS image, uas.status AS status, reviews.rating AS rating, reviews.comment AS comment
      FROM user_anime_status uas
      LEFT JOIN reviews ON uas.anime_id = reviews.anime_id AND uas.user_id = reviews.user_id
      JOIN anime ON uas.anime_id = anime.id
      WHERE uas.user_id = $1 AND uas.status = $2
      ORDER BY uas.updated_at DESC
      LIMIT $3 OFFSET $4
      `,
    [userId, status, limit, offset]
  )

  return rows
}

export const getUserInfo = async (userId: string) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [
    userId,
  ])
  return rows[0]
}

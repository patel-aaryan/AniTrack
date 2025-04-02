import pool from "../db"

import "server-only"

// Define interface for raw connection data from query
export interface FriendDist {
  id: string
  name: string
  degree: number
}

export interface RawConnection {
  user_id1: string
  user_id2: string
}

export interface PotentialFriend {
  id: string
  name: string
  shared_anime_count: number
}

/**
 * Gets all users within 10 degrees of separation from the current user
 */
export async function getUserFriends(userID: string): Promise<FriendDist[]> {
  const { rows } = (await pool.query(
    `
    WITH RECURSIVE AP AS (
      (
        SELECT user_id1, user_id2, 1 AS conn_dist FROM FP
      )
      UNION
      (
        SELECT AP.user_id1, FP.user_id2, conn_dist + 1 
        FROM AP, FP 
        WHERE AP.user_id2 = FP.user_id1
        AND conn_dist < 10
      )
    ),
    FP AS (
      SELECT user_id1, user_id2 FROM friendship
      UNION
      SELECT user_id2 AS user_id1, user_id1 AS user_id2 FROM friendship
    ),
    AFP AS (
      SELECT user_id1, user_id2, MIN(conn_dist) AS conn_dist
      FROM (
        SELECT * FROM AP
        UNION
        SELECT user_id2 AS user_id1, user_id1 AS user_id2, conn_dist FROM AP
      ) AS conn_dists
      WHERE (user_id1 < user_id2)
      GROUP BY user_id1, user_id2
      ORDER BY conn_dist ASC
    )
    SELECT id, name, conn_dist AS degree
    FROM AFP JOIN users ON AFP.user_id2 = users.id
    WHERE user_id1 = $1
    UNION 
    SELECT id, name, conn_dist AS degree
    FROM AFP JOIN users ON AFP.user_id1 = users.id
    WHERE user_id2 = $1
    `,
    [userID]
  )) as { rows: FriendDist[] }

  return rows
}

/**
 * Get all friendships in the database
 */
export async function getFriendGraphData(): Promise<RawConnection[]> {
  const { rows } = (await pool.query(
    `
    WITH FP AS (
      SELECT user_id1, user_id2 FROM friendship
      UNION
      SELECT user_id2 AS user_id1, user_id1 AS user_id2 FROM friendship
    )
    SELECT *
    FROM FP
    WHERE user_id1 < user_id2
    `
  )) as { rows: RawConnection[] }

  return rows
}

// Add this function to check if the current user is friends with another user
export async function checkFriendshipStatus(
  userId: string,
  currentUserId: string
): Promise<boolean> {
  try {
    const { rows } = await pool.query(
      `
      SELECT COUNT(*) > 0 as is_friend
      FROM friendship
      WHERE (user_id1 = $1 AND user_id2 = $2) OR (user_id1 = $2 AND user_id2 = $1)
      `,
      [currentUserId, userId]
    )

    return rows[0].is_friend
  } catch (error) {
    console.error("Error checking friendship status:", error)
    return false
  }
}

export async function getPotentialFriends(
  userID: string
): Promise<PotentialFriend[]> {
  const { rows } = (await pool.query(
    `
    WITH user_anime AS (
      SELECT anime_id 
      FROM user_anime_status 
      WHERE user_id = $1
    ),
    existing_friends AS (
      SELECT user_id2 as friend_id 
      FROM friendship 
      WHERE user_id1 = $1
      UNION
      SELECT user_id1 as friend_id 
      FROM friendship 
      WHERE user_id2 = $1
    )
    SELECT 
      u.id,
      u.name,
      COUNT(DISTINCT uas.anime_id) as shared_anime_count
    FROM users u
    JOIN user_anime_status uas ON u.id = uas.user_id
    WHERE uas.anime_id IN (SELECT anime_id FROM user_anime)
    AND u.id != $1
    AND u.id NOT IN (SELECT friend_id FROM existing_friends)
    GROUP BY u.id, u.name
    ORDER BY shared_anime_count DESC
    LIMIT 10
    `,
    [userID]
  )) as { rows: PotentialFriend[] }
  return rows
}

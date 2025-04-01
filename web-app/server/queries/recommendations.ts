import db from "../db"

export async function getAnimeRecommendations(userId: number) {
  try {
    // get similar users based on rating patterns
    const similarUsersQuery = `WITH user_rating_avg AS (
            SELECT user_id, AVG(rating) as avg_rating
            FROM reviews
            GROUP BY user_id
        ),
        normalized_ratings AS (
            SELECT 
                r.user_id,
                r.anime_id,
                r.rating - ura.avg_rating as normalized_rating
            FROM reviews r
            JOIN user_rating_avg ura ON r.user_id = ura.user_id
        ),
        user_similarities AS (
            SELECT 
                LEAST(r1.user_id, r2.user_id) as user_id1,
                GREATEST(r1.user_id, r2.user_id) as user_id2,
                CORR(r1.normalized_rating, r2.normalized_rating) as similarity_score,
                COUNT(*) as common_ratings
            FROM normalized_ratings r1
            JOIN normalized_ratings r2 ON r1.anime_id = r2.anime_id AND r1.user_id != r2.user_id
            GROUP BY LEAST(r1.user_id, r2.user_id), GREATEST(r1.user_id, r2.user_id)
            HAVING COUNT(*) >= 2
        )
        SELECT 
            CASE 
                WHEN user_id1 = $1 THEN user_id2 
                ELSE user_id1 
            END as similar_user_id,
            similarity_score
        FROM user_similarities
        WHERE user_id1 = $1 OR user_id2 = $1
        ORDER BY similarity_score DESC NULLS LAST
        LIMIT 10`
    const similarUsers = await db.query(similarUsersQuery, [userId])
    if (similarUsers.rows.length === 0) {
      return {
        success: true,
        data: [], // return empty recommendations
      }
    }
    // get recommendations from similar users
    const recommendationsQuery = `WITH similar_user_ratings AS (
            SELECT 
                r.anime_id,
                r.rating,
                s.similarity_score,
                r.rating * COALESCE(s.similarity_score, 0) as weighted_rating
            FROM reviews r
            JOIN (
                SELECT similar_user_id as user_id, similarity_score
                FROM (${similarUsersQuery}) as sq
            ) s ON r.user_id = s.user_id
            WHERE r.rating >= 7
            AND NOT EXISTS (
                SELECT 1 
                FROM reviews ur 
                WHERE ur.user_id = $1 
                AND ur.anime_id = r.anime_id
            )
        )
        SELECT 
            a.id as anime_id,
            a.name as anime_name,
            a.image_url,
            ROUND(
                COALESCE(SUM(sur.weighted_rating) / NULLIF(SUM(sur.similarity_score), 0), 0)::numeric, 
                2
            ) as predicted_rating
        FROM similar_user_ratings sur
        JOIN anime a ON sur.anime_id = a.id
        GROUP BY a.id, a.name, a.image_url
        HAVING COUNT(*) >= 1
        ORDER BY predicted_rating DESC NULLS LAST
        LIMIT 10`
    const recommendations = await db.query(recommendationsQuery, [userId])
    return {
      success: true,
      data: recommendations.rows,
    }
  } catch (error) {
    console.error("Error getting anime recommendations:", error)
    return {
      success: false,
      error: "Failed to fetch recommendations",
    }
  }
}

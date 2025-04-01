import { WatchedStatus } from "@/types/anime"
import { auth } from "@/lib/auth"
import pool from "@/server/db"
import { getAnimeUserStatus } from "@/server/queries/anime"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusButtonGroup } from "./status-button"

export async function WatchedStatusSection({ animeId }: { animeId: number }) {
  const initialStatus = await getAnimeUserStatus(animeId)

  const handleStatusChange = async (status: WatchedStatus | null) => {
    "use server"
    const session = await auth()
    if (!session) {
      throw new Error("User not authenticated")
    }
    const userId = session.user.id
    if (status === null) {
      // delete the watched status
      await pool.query(
        "DELETE FROM user_anime_status WHERE anime_id = $1 AND user_id = $2",
        [animeId, userId]
      )
    } else {
      await pool.query(
        "INSERT INTO user_anime_status (anime_id, user_id, status) VALUES ($1, $2, $3) ON CONFLICT (anime_id, user_id) DO UPDATE SET status = $3",
        [animeId, userId, status]
      )
    }

    // Return the new status to confirm the change succeeded
    return status
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Watched Status</CardTitle>
      </CardHeader>
      <CardContent>
        <StatusButtonGroup
          initialStatus={initialStatus}
          handleStatusChange={handleStatusChange}
        />
      </CardContent>
    </Card>
  )
}

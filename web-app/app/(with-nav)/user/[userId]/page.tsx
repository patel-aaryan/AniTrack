import { Clock, Eye, Heart } from "lucide-react"

import { AnimeStatus } from "@/types/anime"
import { auth } from "@/lib/auth"
import {
  checkFriendshipStatus,
  getFriendGraphData,
  getUserFriends,
} from "@/server/queries/friends"
import {
  getUserAnimeByStatus,
  getUserAnimeCount,
  getUserInfo,
} from "@/server/queries/user"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddFriendButton } from "@/components/add-friend-button"
import { AnimeCardWithReview } from "@/components/anime-card-with-review"
import { FriendGraph } from "@/components/friend-graph"

export default async function UserPage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params

  // Get the current user's session
  const session = await auth()
  const currentUserId = session?.user?.id || null

  const [userAnimeCount, userInfo, rawConnections, friendDistances, isFriend] =
    await Promise.all([
      getUserAnimeCount(userId),
      getUserInfo(userId),
      getFriendGraphData(),
      getUserFriends(userId),
      currentUserId ? checkFriendshipStatus(userId, currentUserId) : false,
    ])

  // Only show Add Friend button if user is logged in and viewing someone else's profile
  const someoneElsesProfile = currentUserId && currentUserId != userId

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center relative">
        {someoneElsesProfile && (
          <div className="absolute top-0 right-0">
            <AddFriendButton userId={userId} isFriend={isFriend} />
          </div>
        )}

        <Avatar size={128} src={userInfo.image} alt={userInfo.name} />
        <h1 className="text-2xl font-bold">{userInfo.name}</h1>
        <div className="flex gap-2 mt-2">
          <Badge variant="outline" className="flex gap-1 items-center">
            <Clock className="h-3 w-3" />
            <span>Since {new Date(userInfo.created_at).getFullYear()}</span>
          </Badge>
        </div>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
            <span className="text-2xl font-bold">
              {userAnimeCount[AnimeStatus.Watching]}
            </span>
            <span className="text-sm text-muted-foreground">Watching</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
            <span className="text-2xl font-bold">
              {userAnimeCount[AnimeStatus.Completed]}
            </span>
            <span className="text-sm text-muted-foreground">Completed</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
            <span className="text-2xl font-bold">
              {userAnimeCount[AnimeStatus.Wishlist]}
            </span>
            <span className="text-sm text-muted-foreground">Wishlist</span>
          </div>
        </div>
      </div>

      <Tabs
        defaultValue={AnimeStatus.Watching.toString()}
        className="mt-6 w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value={AnimeStatus.Watching.toString()}>
            <Clock className="h-4 w-4" />
            <span>Watching</span>
          </TabsTrigger>
          <TabsTrigger value={AnimeStatus.Completed.toString()}>
            <Eye className="h-4 w-4" />
            <span>Watched</span>
          </TabsTrigger>
          <TabsTrigger value={AnimeStatus.Wishlist.toString()}>
            <Heart className="h-4 w-4" />
            <span>Plan to Watch</span>
          </TabsTrigger>
        </TabsList>

        {Object.values(AnimeStatus)
          .filter((status) => typeof status === "number")
          .map(async (status) => {
            const userAnime = await getUserAnimeByStatus({
              userId,
              status: status as AnimeStatus,
            })
            return (
              <TabsContent
                key={status}
                value={status.toString()}
                className="mt-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {userAnime.map((anime) => (
                    <AnimeCardWithReview key={anime.id} {...anime} />
                  ))}
                </div>
              </TabsContent>
            )
          })}
      </Tabs>

      <Card className="mt-8">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold">Friends</CardTitle>
              <CardDescription>{`See ${userInfo.name}'s anime community connections`}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-muted/30 rounded-md">
            <FriendGraph
              userId={userId}
              userName={userInfo.name}
              rawConnections={rawConnections}
              friendDistances={friendDistances}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

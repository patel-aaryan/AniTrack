import { Clock, Eye, Heart } from "lucide-react"

import { AnimeStatus } from "@/types/anime"
import {
  getUserAnimeByStatus,
  getUserAnimeCount,
  getUserInfo,
} from "@/server/queries/user"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimeCardWithReview } from "@/components/anime-card-with-review"

export default async function UserPage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params

  const [userAnimeCount, userInfo] = await Promise.all([
    getUserAnimeCount(userId),
    getUserInfo(userId),
  ])

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center">
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
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">About Me</h3>
          {userInfo.bio && (
            <p className="text-muted-foreground">{userInfo.bio}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
            <span className="text-2xl font-bold">
              {userAnimeCount[AnimeStatus.Completed]}
            </span>
            <span className="text-sm text-muted-foreground">Completed</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
            <span className="text-2xl font-bold">
              {userAnimeCount[AnimeStatus.Watching]}
            </span>
            <span className="text-sm text-muted-foreground">Watching</span>
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
    </div>
  )
}

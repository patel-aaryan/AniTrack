import { getTopAnime } from "@/server/queries/anime"
import { AnimePreview } from "@/components/AnimePreview"

export default async function Home() {
  const anime = await getTopAnime()

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Top Anime</h1>
        <p className="text-gray-600">Discover the highest-rated anime series</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {anime.map((anime) => (
          <AnimePreview key={anime.id} {...anime} />
        ))}
      </div>
    </div>
  )
}

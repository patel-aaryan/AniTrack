import Image from "next/image"

import { searchAnime } from "@/server/queries/anime"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SearchForm from "./search-form"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>
}) {
  const query = (await searchParams).name ?? ""
  const anime = await searchAnime(query)
  return (
    <div className="flex flex-col gap-4 px-8 py-10">
      <SearchForm initialQuery={query} />
      <div className="flex flex-col gap-4">
        {anime.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  )
}

type Anime = {
  id: string
  name: string
  description: string
  image_url: string
}

const AnimeCard = ({ anime }: { anime: Anime }) => {
  return (
    <Card className="flex gap-4">
      <Image src={anime.image_url} alt={anime.name} width={100} height={100} />
      <CardHeader>
        <CardTitle>{anime.name}</CardTitle>
        <CardDescription className="line-clamp-3">
          {anime.description}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

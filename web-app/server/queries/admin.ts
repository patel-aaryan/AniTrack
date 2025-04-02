import { IAnime } from "@/types/anime"
import { ANIME_ROW_LIMIT } from "@/lib/constants"

type AnimeResponse = {
  rows: IAnime[]
  count: number
}

export async function fetchAnime(offset = 0): Promise<AnimeResponse> {
  const response = await fetch(
    `/api/anime?limit=${ANIME_ROW_LIMIT}&offset=${offset}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  )
  const result = await response.json()
  return result.data
}

interface FilterAnimesParams {
  name?: string
  is_verified?: boolean
}

export async function filterAnimes(
  offset = 0,
  body: FilterAnimesParams
): Promise<AnimeResponse> {
  const response = await fetch(
    `/api/anime?limit=${ANIME_ROW_LIMIT}&offset=${offset}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  )
  const result = await response.json()
  return result.data
}

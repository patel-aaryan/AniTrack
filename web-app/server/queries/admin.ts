import { IAnime } from "@/types/anime"

export async function fetchAnime(): Promise<IAnime[]> {
  const response = await fetch("/api/anime?limit=100&?offset=0", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  const result = await response.json()
  return result.data
}

export async function filterAnimes(
  name?: string,
  is_verified?: boolean
): Promise<IAnime[]> {
  const response = await fetch("/api/anime?limit=100&?offset=0", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, is_verified }),
  })
  const result = await response.json()
  return result.data
}

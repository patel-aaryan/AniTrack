export interface IAnimePreview {
  id: number
  name: string
  image_url: string
  genres: {
    id: number
    name: string
  }[]
  avg_rating: number | null
}

export interface IAnime {
  id: number
  name: string
  description: string
  image_url: string
  is_verified: boolean
}

export interface IAnimePreview {
  id: number
  name: string
  image: string
  genres: {
    id: number
    name: string
  }[]
  avg_rating: number | null
}

export enum AnimeStatus {
  Watching = 1,
  Completed = 2,
  Wishlist = 3,
}

export interface IAnime {
  id: number
  name: string
  description: string
  image_url: string
  is_verified: boolean
}

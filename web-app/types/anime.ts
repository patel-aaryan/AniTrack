export interface IAnimePreview {
  id: number
  name: string
  imageUrl: string
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

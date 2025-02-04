import db from "../db"

import "server-only"

import { RowDataPacket } from "mysql2"

import { TAnimePreview } from "@/types/anime"

interface TAnimePreviewRaw
  extends Omit<TAnimePreview, "genres">,
    RowDataPacket {
  genre: string | null
}

export async function getTopAnime(
  limit: number = 100,
  offset: number = 0
): Promise<TAnimePreview[]> {
  const [rows] = await db.query<TAnimePreviewRaw[]>(
    `SELECT anime_id, title, image_url, genre, score, \`rank\` FROM anime_list ORDER BY \`rank\` ASC LIMIT ${limit} OFFSET ${offset}`
  )
  // split the genre into an array
  return rows.map((row) => ({
    ...row,
    genres: row.genre ? row.genre.split(",") : [],
  }))
}

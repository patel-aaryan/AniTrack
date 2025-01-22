import db from "../db";
import "server-only";
import { RowDataPacket } from "mysql2";

interface AnimePreview extends RowDataPacket {
  anime_id: number;
  title: string;
  image_url: string;
  genre: string;
  score: number;
  rank: number;
}

export async function getTopAnime(
  limit: number = 100,
  offset: number = 0
): Promise<AnimePreview[]> {
  const [rows] = await db.query<AnimePreview[]>(
    `SELECT anime_id, title, image_url, genre, score, rank FROM anime_list ORDER BY rank ASC LIMIT ${limit} OFFSET ${offset}`
  );
  return rows;
}

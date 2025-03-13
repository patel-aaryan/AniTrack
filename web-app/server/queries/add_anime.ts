import pool from "../db"

import "server-only"

export async function addAnime(
  name: string,
  description: string,
  image_url: string
) {
  const add_query = `INSERT INTO anime (name, description, image_url, is_verified)
    VALUES ('${name}', '${description}', '${image_url}', FALSE)`

  await pool.query(add_query)
}

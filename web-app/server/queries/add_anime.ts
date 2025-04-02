import pool from "../db"

import "server-only"

export async function addAnime(
  name: string,
  description: string,
  image_url: string
): Promise<string> {
  // error checks to ensure valid inputs into db
  if (!name || name.trim() === "") {
    return "name"
  }

  if (!description || description.trim() === "") {
    return "description"
  }

  if (
    !image_url ||
    image_url.trim() === "" ||
    !image_url.includes("http") ||
    !image_url.includes(".")
  ) {
    return "image url"
  }
  const add_query = `INSERT INTO anime (name, description, image_url, is_verified)
    VALUES ('${name}', '${description}', '${image_url}', FALSE)`

  await pool.query(add_query)
  return "valid"
}

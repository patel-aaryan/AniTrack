"use server"

import { addAnime } from "@/server/queries/add_anime"

export async function submitNewAnime(formData: FormData) {
  const name = formData.get("name") as string
  const desc = formData.get("desc") as string
  const img = formData.get("img") as string

  await addAnime(name, desc, img)
}

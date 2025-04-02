"use client"

import { useSearchParams } from "next/navigation"

export default function ErrorMsg() {
  const searchParams = useSearchParams()

  const valid = searchParams?.get("error")

  // This will not be logged on the server when using static rendering
  if (valid !== null) {
    return <p className="text-red">Error with {valid} field</p>
  } else {
    return <p></p>
  }
}

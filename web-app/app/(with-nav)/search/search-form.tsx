"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  initialQuery: string
}

export default function SearchForm({ initialQuery }: Props) {
  const [searchInput, setSearchInput] = useState(initialQuery)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (searchInput.trim()) {
      params.set("name", searchInput.trim())
    }

    router.push(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 mb-6">
      <Input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Type anime name..."
        className="flex-1 border border-gray-300 rounded p-2"
      />
      <Button type="submit">
        <SearchIcon className="w-4 h-4" />
      </Button>
    </form>
  )
}

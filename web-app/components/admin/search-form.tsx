"use client"

import { useState } from "react"
import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchFormProps {
  handleFilter: (query: string) => void
  totalResults: number
}

export function SearchForm({
  handleFilter,
  totalResults = 0,
}: SearchFormProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleFilter(query)
  }

  const clearSearch = () => {
    setQuery("")
    handleFilter("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative max-w-md flex-1">
        <Input
          type="text"
          placeholder="Search anime titles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pr-8"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button type="submit" variant="outline">
          Search
        </Button>
        {totalResults !== undefined && (
          <Badge variant="secondary" className="ml-1">
            {totalResults} result{totalResults !== 1 ? "s" : ""}
          </Badge>
        )}
      </div>
    </form>
  )
}

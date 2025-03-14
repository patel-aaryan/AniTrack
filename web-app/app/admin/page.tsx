"use client"

import { useEffect, useState } from "react"

import { IAnime } from "@/types/anime"
import { fetchAnime } from "@/server/queries/admin"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import SearchForm from "@/components/search-form"
import VerifyPopup from "@/components/verify-popup"

// type FilterType = "all" | "verified" | "unverified"

export default function Admin() {
  const [animeData, setAnimeData] = useState<IAnime[]>()
  // const [activeFilter, setActiveFilter] = useState<FilterType>("all")

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogHeader, setDialogHeader] = useState("")
  const [dialogDescription, setDialogDescription] = useState<
    React.ReactNode | undefined
  >()
  const [yesText, setYesText] = useState("")
  const [noText, setNoText] = useState("")
  const [selectedAnimeId, setSelectedAnimeId] = useState(-1)
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    const getAnimeData = async () => {
      const response = await fetchAnime()
      setAnimeData(response)
    }

    getAnimeData()
  }, [])

  const handleClick = async (anime: IAnime) => {
    setSelectedAnimeId(anime.id)
    setIsVerified(anime.is_verified)

    if (anime.is_verified) {
      setDialogHeader("Delete Anime")
      setYesText("Cancel")
      setNoText("Delete")
      setDialogDescription(
        <>
          Do you wish to delete <strong>&quot;{anime.name}&quot;</strong>? This
          action cannot be undone.
        </>
      )
    } else {
      setDialogHeader("Verify Anime")
      setYesText("Verify")
      setNoText("Reject")
      setDialogDescription(
        <>
          Do you wish to verify <strong>&quot;{anime.name}&quot;</strong>? This
          action cannot be undone.
        </>
      )
    }
    setIsDialogOpen(true)
  }

  const handleFilter = async (query: string) => {
    const data = await fetchAnime()

    const filteredData = data?.filter((anime) =>
      anime.name.toLowerCase().includes(query.toLowerCase())
    )
    setAnimeData(filteredData)
  }

  const handleConfirm = async (verify: boolean) => {
    if (isVerified && verify) return

    const method = verify ? "PATCH" : "DELETE"
    const body = verify
      ? { id: selectedAnimeId, verified: true }
      : { id: selectedAnimeId }

    const response = await fetch("/api/anime", {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    if (data.success) window.location.reload()
  }

  if (!animeData) return <div>Loading...</div>

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Anime Admin Panel</h1>

      <SearchForm handleFilter={handleFilter} />

      <VerifyPopup
        id={selectedAnimeId}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        header={dialogHeader}
        description={dialogDescription}
        yesText={yesText}
        noText={noText}
        handleConfirm={handleConfirm}
      />

      <div className="border rounded-md mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {animeData.length > 0 ? (
              animeData.map((anime) => (
                <TableRow key={anime.id}>
                  <TableCell className="font-medium">{anime.name}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full 
                        ${
                          anime.is_verified
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {anime.is_verified ? "Verified" : "Unverified"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={anime.is_verified ? "destructive" : "default"}
                      size="sm"
                      className="w-1/3"
                      onClick={() => handleClick(anime)}
                    >
                      {anime.is_verified ? "Delete" : "Verify"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No anime found matching your search criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

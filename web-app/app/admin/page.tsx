"use client"

import { useEffect, useState } from "react"

import { FilterType } from "@/types/admin"
import { IAnime } from "@/types/anime"
import { fetchAnime, filterAnimes } from "@/server/queries/admin"
import {
  AdminFilters,
  AdminTable,
  SearchForm,
  VerifyPopup,
} from "@/components/admin"

export default function Admin() {
  const [animeData, setAnimeData] = useState<IAnime[]>()
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")

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

  const handleSearchFilter = async (query: string) => {
    const data = await fetchAnime()

    const filteredData = data?.filter((anime) =>
      anime.name.toLowerCase().includes(query.toLowerCase())
    )
    setAnimeData(filteredData)
  }

  const handleFilters = async (filter: FilterType) => {
    setActiveFilter(filter)

    if (filter === "all") {
      const data = await fetchAnime()
      setAnimeData(data)
    } else if (filter === "verified") {
      const data = await filterAnimes({ is_verified: true })
      setAnimeData(data)
    } else if (filter === "unverified") {
      const data = await filterAnimes({ is_verified: false })
      setAnimeData(data)
    }
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

      <SearchForm handleFilter={handleSearchFilter} />

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

      <AdminFilters
        activeFilter={activeFilter}
        onFilterChange={handleFilters}
      />

      <AdminTable animeData={animeData} handleClick={handleClick} />
    </div>
  )
}

"use client"

import { ReactNode, useEffect, useState } from "react"

import { FilterType } from "@/types/admin"
import { IAnime } from "@/types/anime"
import { ANIME_ROW_LIMIT } from "@/lib/constants"
import { fetchAnime, filterAnimes } from "@/server/queries/admin"
import {
  AdminFilters,
  AdminTable,
  SearchForm,
  VerifyPopup,
} from "@/components/admin"
import { Pagination } from "@/components/pagination"

export default function Admin() {
  const [animeData, setAnimeData] = useState<IAnime[]>()
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogHeader, setDialogHeader] = useState("")
  const [dialogDesc, setDialogDesc] = useState<ReactNode | undefined>()
  const [yesText, setYesText] = useState("")
  const [noText, setNoText] = useState("")
  const [selectedAnimeId, setSelectedAnimeId] = useState(-1)
  const [isVerified, setIsVerified] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getAnimeData = async () => {
      const { rows, count } = await fetchAnime()
      setAnimeData(rows)
      setTotalItems(count)
    }

    getAnimeData()
  }, [])

  const paginate = async (pageNumber: number) => {
    setLoading(true)
    setCurrentPage(pageNumber)
    const { rows } = await fetchAnime((pageNumber - 1) * ANIME_ROW_LIMIT)
    setAnimeData(rows)
    setLoading(false)
  }

  const handleClick = async (anime: IAnime) => {
    setSelectedAnimeId(anime.id)
    setIsVerified(anime.is_verified)

    if (anime.is_verified) {
      setDialogHeader("Delete Anime")
      setYesText("Cancel")
      setNoText("Delete")
      setDialogDesc(
        <>
          Do you wish to delete <strong>&quot;{anime.name}&quot;</strong>? This
          action cannot be undone.
        </>
      )
    } else {
      setDialogHeader("Verify Anime")
      setYesText("Verify")
      setNoText("Reject")
      setDialogDesc(
        <>
          Do you wish to verify <strong>&quot;{anime.name}&quot;</strong>? This
          action cannot be undone.
        </>
      )
    }
    setIsDialogOpen(true)
  }

  // replace with advanced feature 3
  const handleSearchFilter = async (query: string) => {
    setLoading(true)
    const { rows, count } = await fetchAnime()

    const filteredData = rows?.filter((anime) =>
      anime.name.toLowerCase().includes(query.toLowerCase())
    )
    setAnimeData(query === "" ? rows : filteredData)
    setTotalItems(query === "" ? count : filteredData?.length)
    setCurrentPage(1)
    setLoading(false)
  }

  const handleFilters = async (filter: FilterType) => {
    setLoading(true)
    setActiveFilter(filter)
    setCurrentPage(1)

    if (filter === "all") {
      const { rows, count } = await fetchAnime()
      setAnimeData(rows)
      setTotalItems(count)
    } else if (filter === "verified") {
      const { rows, count } = await filterAnimes(0, { is_verified: true })
      setAnimeData(rows)
      setTotalItems(count)
    } else if (filter === "unverified") {
      const { rows, count } = await filterAnimes(0, { is_verified: false })
      setAnimeData(rows)
      setTotalItems(count)
    }
    setLoading(false)
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
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
            <span className="font-medium">Loading...</span>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Anime Admin Panel</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="w-full">
          <SearchForm
            handleFilter={handleSearchFilter}
            totalResults={totalItems}
          />
        </div>

        {totalItems > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            paginate={paginate}
          />
        )}
      </div>

      <VerifyPopup
        id={selectedAnimeId}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        header={dialogHeader}
        description={dialogDesc}
        yesText={yesText}
        noText={noText}
        handleConfirm={handleConfirm}
      />

      <AdminFilters
        activeFilter={activeFilter}
        onFilterChange={handleFilters}
      />

      <AdminTable animeData={animeData} handleClick={handleClick} />

      {totalItems > 0 && (
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            paginate={paginate}
          />
        </div>
      )}
    </div>
  )
}

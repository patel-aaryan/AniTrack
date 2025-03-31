import React from "react"

import { ANIME_ROW_LIMIT } from "@/lib/constants"

interface PaginationProps {
  currentPage: number
  totalItems: number
  paginate: (pageNumber: number) => void
}

export const Pagination = ({
  currentPage,
  totalItems,
  paginate,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / ANIME_ROW_LIMIT)

  return (
    <nav
      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
      aria-label="Pagination"
    >
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`relative inline-flex items-center px-2 py-2 rounded-l-md
          border border-gray-300 bg-white text-sm font-medium ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-500 hover:bg-gray-50"
          }`}
      >
        <span className="sr-only">Previous</span>
        &larr;
      </button>

      {(() => {
        let pagesToShow = []

        if (totalPages <= 5) {
          pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1)
        } else {
          pagesToShow.push(1)
          if (currentPage > 3) pagesToShow.push("ellipsis1")

          const start = Math.max(2, currentPage - 1)
          const end = Math.min(totalPages - 1, currentPage + 1)
          for (let i = start; i <= end; i++) pagesToShow.push(i)

          if (currentPage < totalPages - 2) pagesToShow.push("ellipsis2")
          if (totalPages > 1) pagesToShow.push(totalPages)
        }

        return pagesToShow.map((page, index) => {
          if (page === "ellipsis1" || page === "ellipsis2") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="relative inline-flex items-center px-4 py-2 border
                border-gray-300 bg-white text-sm font-medium text-gray-700"
              >
                &hellip;
              </span>
            )
          }

          return (
            <button
              key={index}
              onClick={() => paginate(page as number)}
              className={`relative inline-flex items-center px-4 py-2 border
                border-gray-300 bg-white text-sm font-medium ${
                  currentPage === page
                    ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
            >
              {page}
            </button>
          )
        })
      })()}

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`relative inline-flex items-center px-2 py-2 rounded-r-md
          border border-gray-300 bg-white text-sm font-medium ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-500 hover:bg-gray-50"
          }`}
      >
        <span className="sr-only">Next</span>
        &rarr;
      </button>
    </nav>
  )
}

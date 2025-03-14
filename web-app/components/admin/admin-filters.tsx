import React from "react"

import { FilterType } from "@/types/admin"
import { cn } from "@/lib/utils"

interface AdminFiltersProps {
  activeFilter: "all" | "verified" | "unverified"
  onFilterChange: (filter: FilterType) => Promise<void>
}

export function AdminFilters({
  activeFilter,
  onFilterChange,
}: AdminFiltersProps) {
  return (
    <div className="flex space-x-1 rounded-lg bg-muted p-1 mb-4">
      <button
        onClick={() => onFilterChange("all")}
        className={cn(
          "flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all",
          activeFilter === "all"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:bg-background/50"
        )}
      >
        All
      </button>
      <button
        onClick={() => onFilterChange("verified")}
        className={cn(
          "flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all",
          activeFilter === "verified"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:bg-background/50"
        )}
      >
        Verified
      </button>
      <button
        onClick={() => onFilterChange("unverified")}
        className={cn(
          "flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all",
          activeFilter === "unverified"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:bg-background/50"
        )}
      >
        Unverified
      </button>
    </div>
  )
}

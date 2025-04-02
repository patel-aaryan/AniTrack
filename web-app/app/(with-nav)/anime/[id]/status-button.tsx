"use client"

import { useOptimistic, useTransition } from "react"
import { useRouter } from "next/navigation"

import { WatchedStatus } from "@/types/anime"
import { Button } from "@/components/ui/button"

// Interface for the Status Button component
interface StatusButtonProps {
  status: WatchedStatus | null
  currentStatus: WatchedStatus | null
  label: string
  handleStatusChange: (status: WatchedStatus | null) => void
}

// Create a client component to manage all buttons and state
export function StatusButtonGroup({
  initialStatus,
  handleStatusChange,
}: {
  initialStatus: WatchedStatus | null
  handleStatusChange: (
    status: WatchedStatus | null
  ) => Promise<WatchedStatus | null>
}) {
  const router = useRouter()
  // Set up optimistic state
  const [optimisticStatus, updateOptimisticStatus] = useOptimistic(
    initialStatus,
    (currentState, newStatus: WatchedStatus | null) => newStatus
  )

  const [, startTransition] = useTransition()

  // Function to handle status changes with optimistic updates
  const updateStatus = (newStatus: WatchedStatus | null) => {
    startTransition(async () => {
      // Update UI optimistically
      updateOptimisticStatus(newStatus)

      try {
        // Perform the actual server action
        await handleStatusChange(newStatus)
        router.refresh()
      } catch (error) {
        // If there's an error, we could revert or show a notification
        console.error("Failed to update status:", error)
        // Optionally revert the optimistic update on error
        updateOptimisticStatus(initialStatus)
      }
    })
  }

  return (
    <div className="grid grid-cols-4 gap-2 w-fit">
      <div className="col-span-1">
        <StatusButton
          status={WatchedStatus.Watching}
          currentStatus={optimisticStatus}
          label="Watching"
          handleStatusChange={updateStatus}
        />
      </div>
      <div className="col-span-1">
        <StatusButton
          status={WatchedStatus.Completed}
          currentStatus={optimisticStatus}
          label="Completed"
          handleStatusChange={updateStatus}
        />
      </div>
      <div className="col-span-1">
        <StatusButton
          status={WatchedStatus.Wishlist}
          currentStatus={optimisticStatus}
          label="Wishlist"
          handleStatusChange={updateStatus}
        />
      </div>
      <div className="col-span-1">
        <StatusButton
          status={null}
          currentStatus={optimisticStatus}
          label="N/A"
          handleStatusChange={updateStatus}
        />
      </div>
    </div>
  )
}

// Individual button component
export function StatusButton({
  status,
  currentStatus,
  label,
  handleStatusChange,
}: StatusButtonProps) {
  return (
    <Button
      variant={currentStatus === status ? "default" : "outline"}
      onClick={() => handleStatusChange(status)}
      className="w-full"
    >
      {label}
    </Button>
  )
}

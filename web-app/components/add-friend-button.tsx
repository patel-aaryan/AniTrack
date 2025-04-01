"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, UserMinus, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function AddFriendButton({
  userId,
  isFriend,
}: {
  userId: string
  isFriend: boolean
}) {
  const [isPending, setIsPending] = useState(false)
  const [friendStatus, setFriendStatus] = useState(isFriend)
  const router = useRouter()
  const { toast } = useToast()

  const handleFriendAction = async () => {
    const isRemovingFriend = friendStatus // Store current status before we change it

    try {
      setIsPending(true)

      const response = await fetch("/api/friends", {
        method: isRemovingFriend ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to update friend status")
      }

      // Toggle friend status
      setFriendStatus(!friendStatus)

      // Show success message
      toast({
        title: isRemovingFriend ? "Friend removed" : "Friend added",
        description: isRemovingFriend
          ? "Successfully removed from your friends"
          : "Successfully added to your friends",
        variant: "default",
      })

      // Refresh the page to update the friend graph
      router.refresh()
    } catch (error) {
      console.error("Error updating friend status:", error)
      toast({
        title: "Error",
        description: "Failed to update friend status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPending(false)
    }
  }

  if (isPending) {
    return (
      <Button variant="outline" disabled>
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Processing...
      </Button>
    )
  }

  if (friendStatus) {
    return (
      <Button
        variant="outline"
        onClick={handleFriendAction}
        className="flex gap-1"
      >
        <UserMinus className="h-4 w-4" />
        <span>Remove Friend</span>
      </Button>
    )
  }

  return (
    <Button onClick={handleFriendAction} className="flex gap-1">
      <UserPlus className="h-4 w-4" />
      <span>Add Friend</span>
    </Button>
  )
}

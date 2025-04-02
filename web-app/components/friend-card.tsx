"use client"

import Link from "next/link"

import { Card } from "@/components/ui/card"
import { AddFriendButton } from "@/components/add-friend-button"

interface FriendCardProps {
  id: string
  name: string
  sharedAnimeCount: number
}

export function FriendCard({ id, name, sharedAnimeCount }: FriendCardProps) {
  return (
    <Card className="flex items-center p-4">
      <Link
        href={`/user/${id}`}
        className="flex-1 hover:bg-muted/50 rounded-lg transition-colors"
      >
        <div className="font-medium">{name}</div>
        <div className="text-sm text-muted-foreground">
          {sharedAnimeCount} shared anime
        </div>
      </Link>
      <div className="ml-4">
        <AddFriendButton userId={id} isFriend={false} />
      </div>
    </Card>
  )
}

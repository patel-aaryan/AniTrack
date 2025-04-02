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
    <Link
      href={`/user/${id}`}
      className="block transition-colors hover:bg-muted/50 rounded-lg"
    >
      <Card className="flex items-center p-4 hover:bg-muted/50">
        <div className="flex-1">
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">
            {sharedAnimeCount} shared anime
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <AddFriendButton userId={id} isFriend={false} />
        </div>
      </Card>
    </Link>
  )
}

import Link from "next/link"

import { auth } from "@/lib/auth"
import { UserAvatar } from "./user-avatar"

export async function NavBar() {
  const session = await auth()
  return (
    <nav className="bg-white border-b">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard/events" className="flex items-center gap-4">
          <span className="text-2xl font-bold">AniTrack</span>
        </Link>

        {session?.user ? (
          <UserAvatar
            name={session.user.name!}
            email={session.user.email!}
            image={session.user.image}
          />
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}

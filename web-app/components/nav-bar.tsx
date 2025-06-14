import Link from "next/link"
import { SearchIcon } from "lucide-react"

import { auth } from "@/lib/auth"
import { buttonVariants } from "./ui/button"
import { UserAvatar } from "./user-avatar"

export async function NavBar() {
  const session = await auth()

  return (
    <nav className="bg-white border-b">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-4">
          <span className="text-2xl font-bold">AniTrack</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/search"
          >
            <SearchIcon className="w-4 h-4" />
          </Link>
          <Link className={buttonVariants({ variant: "default" })} href="/add">
            Add Anime
          </Link>

          {session?.user?.is_admin && (
            <Link
              className={buttonVariants({ variant: "default" })}
              href="/admin"
            >
              Admin
            </Link>
          )}

          {session?.user ? (
            <UserAvatar
              name={session.user.name!}
              email={session.user.email!}
              image={session.user.image}
              userId={session.user.id!}
            />
          ) : (
            <Link
              className={buttonVariants({ variant: "default" })}
              href="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

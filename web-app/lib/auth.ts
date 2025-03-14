import NeonAdapter from "@auth/neon-adapter"
import { Pool } from "@neondatabase/serverless"
import NextAuth, { DefaultSession } from "next-auth"
import GitHub from "next-auth/providers/github"

// *DO NOT* create a `Pool` here, outside the request handler.

declare module "next-auth" {
  interface Session {
    user: {
      is_admin: boolean
    } & DefaultSession["user"]
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  // Create a `Pool` inside the request handler.
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  return {
    adapter: NeonAdapter(pool),
    providers: [
      GitHub({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      }),
    ],
  }
})

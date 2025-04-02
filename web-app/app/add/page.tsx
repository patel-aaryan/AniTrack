// page.tsx (Server Component)

import Link from "next/link"

import { NavBar } from "@/components/nav-bar"
import { submitNewAnime } from "./helper"

/* 
We need the following fields:
  -> name
  -> description
  -> image_url
*/

export default function Submit() {
  return (
    <>
      <NavBar />
      <div className="p-8 pl-48 pr-48">
        <form action={submitNewAnime}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">
                Submit a new Anime!
              </h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Please fill out the provided fields.
                <br />
                <br />
                Upon completing the form, a moderator will look over your
                submission and decide whether to verify.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="desc"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="desc"
                      name="desc"
                      rows={3}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-3 text-sm/6 text-gray-600">
                    Write a couple sentences about what the anime is about.
                  </p>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="img"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Image Url
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        id="img"
                        name="img"
                        type="text"
                        className="block min-w-0 grow py-1.5 pl0 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      />
                    </div>
                    <p className="mt-3 text-sm/6 text-gray-600">
                      Provided a link to display as the cover art for this anime
                      submission
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-start gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm"
            >
              Save
            </button>
            <Link
              className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm"
              href="/"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

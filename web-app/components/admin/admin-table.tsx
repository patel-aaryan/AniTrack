import { IAnime } from "@/types/anime"
import { Button } from "../ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

interface AdminTableProps {
  animeData: IAnime[]
  handleClick: (anime: IAnime) => Promise<void>
}

export function AdminTable({ animeData, handleClick }: AdminTableProps) {
  return (
    <div className="border rounded-md mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {animeData.length > 0 ? (
            animeData.map((anime) => (
              <TableRow key={anime.id}>
                <TableCell className="font-medium">{anime.name}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full 
                        ${
                          anime.is_verified
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                  >
                    {anime.is_verified ? "Verified" : "Unverified"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant={anime.is_verified ? "destructive" : "default"}
                    size="sm"
                    className="w-1/3"
                    onClick={() => handleClick(anime)}
                  >
                    {anime.is_verified ? "Delete" : "Verify"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No anime found matching your search criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

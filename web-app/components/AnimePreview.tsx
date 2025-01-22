import { TAnimePreview } from "@/types/anime";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy, Heart } from "lucide-react";
import Image from "next/image";

export const AnimePreview = ({
  anime_id,
  title,
  image_url,
  genres,
  score,
  rank,
}: TAnimePreview) => {
  return (
    <Card key={anime_id} className="overflow-hidden">
      <div className="relative">
        <Image
          src={image_url}
          alt={title}
          className="w-full h-44 object-cover"
          width={256}
          height={176}
        />
        <div className="absolute top-1 right-1">
          <Badge variant="secondary">
            <Heart className="w-3 h-3 mr-1 inline-block fill-current" />
            {score}
          </Badge>
        </div>
        <div className="absolute top-1 left-1">
          <Badge
            variant="secondary"
            className="bg-yellow-500/90 text-white text-xs"
          >
            <Trophy className="w-3 h-3 mr-1 inline-block" />#{rank}
          </Badge>
        </div>
      </div>

      <CardHeader className="px-3 pt-4 pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="p-3 pt-1">
        <div className="flex flex-wrap gap-1">
          {genres.map((genre) => (
            <Badge key={genre} className="px-1.5 py-0">
              {genre}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

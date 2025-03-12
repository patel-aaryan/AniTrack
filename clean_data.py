import pandas as pd
import os

PATH_TO_DATA =  os.path.join("data", "production-data")
PATH_TO_CSV = os.path.join(PATH_TO_DATA, "AnimeList (english only).csv")

df = pd.read_csv(PATH_TO_CSV)

# Apply preprocessing for Genres
# Filter any english names that don't exist
df = df[df["English name"].ne("UNKNOWN") & ~df["English name"].isna()]
df = (
  df
  .reset_index(drop=True)
  .assign(Genres=df.Genres.str.split(','))
  .explode("Genres")
)
# Set null genres as UNKNOWN
df["Genres"] = df["Genres"].fillna("UNKNOWN")

# Create anime csv
anime = (
  df[["English name", "Synopsis", "Image URL"]]
  .rename({
    "English name" : "name",
    "Synopsis" : "description",
    "Image URL" : "image_url"
  }, axis=1)
  .drop_duplicates()
)
anime.index.name = "id"
anime["is_verified"] = True
anime.to_csv(os.path.join(PATH_TO_DATA, "anime.csv"))

# Create genres csv
genres = pd.DataFrame({"name":
  df["Genres"]
  .str.strip()
  .drop_duplicates()
  .dropna()
  .reset_index(drop=True)
}) # Note: UNKNOWN will be used to
genres.index.name = "id"
genres.to_csv(os.path.join(PATH_TO_DATA, "genres.csv"))

# Create anime_genre csv
anime_genre = (
  df[["Genres"]]
  .reset_index()
  .merge(genres.reset_index(), left_on="Genres", right_on="name", how="inner")
  .rename({"index" : "anime_id", "id" : "genre_id"}, axis=1)
  [["anime_id", "genre_id"]]
  .set_index("anime_id")
)
anime_genre.to_csv(os.path.join(PATH_TO_DATA, "anime_genre.csv"))



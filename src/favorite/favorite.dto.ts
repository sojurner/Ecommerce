export interface FavoriteDTO {
  movie_id: string;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  vote_average: string;
}

export type UpdateFavoriteDTO = Partial<FavoriteDTO>;

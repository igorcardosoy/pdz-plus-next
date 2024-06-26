type TMDB_midia = {
    id: number,
    overview: string,
    poster_path: string,
    backdrop_path: string,
    media_type: string,
    genre_ids: Array<number>,
    title?: string,
    release_date?: string,
    name?: string,
    first_air_date?: string
    runtime?: number
    release_date_type?: Date
}

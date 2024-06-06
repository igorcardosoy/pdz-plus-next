class PDZ_midia {
    public title: string
    public tmdb_id: number
    public tmdb_type: string
    public filters: Array<string>
    public magnets?: Array<MagnetLinkWithResolution>
    public seasons?: Array<Season>

    constructor(title: string, tmdb_id: number, tmdb_type: string, filters: Array<string>) {
        this.title = title
        this.tmdb_id = tmdb_id
        this.tmdb_type = tmdb_type
        this.filters = filters
    }

    addMagnet(magnet: MagnetLinkWithResolution) {
        if (this.magnets === undefined) {
            this.magnets = []
        }

        this.magnets.push(magnet)
    }

    getSeasonsQuantity(): number{
        if (this.seasons !== undefined) {
            return this.seasons.length
        }

        return 0
    }

    addSeason(season: Season) {
        if (this.seasons === undefined) {
            this.seasons = []
        }

        this.seasons.push(season)
    }
}

class Season {

    public seasonName: string
    public episodesQuantity: number
    public episodes: Array<Episode>

    constructor(seasonName: string, episodesQuantity: number) {
        this.seasonName = seasonName
        this.episodesQuantity = episodesQuantity
        this.episodes = []
    }

    getEpisodesQuantit(): number {
        return this.episodes.length
    }

    addEpisode(episode: Episode) {
        this.episodes.push(episode)
    }
}

type Episode = {
    episodeName: string,
    magnet: string
}

type MagnetLinkWithResolution = {
    magnet: string,
    resolution: string
}
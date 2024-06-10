class PDZ_midia {
    public title: string
    public id?: number
    public tmdb_id: number
    public tmdb_type: string
    public filter: Array<string>
    public magnet_and_resolution?: Array<MagnetLinkWithResolution>
    public seasons?: Array<Season>

    constructor(title: string, tmdb_id: number, tmdb_type: string, filter: Array<string>) {
        this.title = title
        this.tmdb_id = tmdb_id
        this.tmdb_type = tmdb_type
        this.filter = filter
    }

    addMagnet(magnet: MagnetLinkWithResolution) {
        if (this.magnet_and_resolution === undefined) {
            this.magnet_and_resolution = []
        }

        this.magnet_and_resolution.push(magnet)
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

    public name: string
    public episodesAmount: number
    public episodes: Array<Episode>

    constructor(seasonName: string, episodesQuantity: number) {
        this.name = seasonName
        this.episodesAmount = episodesQuantity
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
    name: string,
    magnetLink: string
}

type MagnetLinkWithResolution = {
    magnetLink: string,
    resolution: string
}

export type {MagnetLinkWithResolution, Episode}
export { PDZ_midia, Season}
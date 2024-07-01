import { get } from "http";
import { getMidiaByQueryFromTMDB, getMidiaCollectionByQueryFromTMDB } from "./requests";

export async function searchMidiaInTMDB(setMidiaList: any, query: string) {
    getMidiaByQueryFromTMDB(query).then((midiaList) => {

        const shortMidiaList = [] as TMDB_midia[]
        for (let index = 0; index < 3; index++) {
            if (midiaList[index] !== undefined) {
                shortMidiaList.push(midiaList[index])
            }
        }

        getMidiaCollectionByQueryFromTMDB(query).then((midiaList) => {
            if (midiaList[1] !== undefined) {
                shortMidiaList.push(midiaList[1])
            }

            setMidiaList(shortMidiaList)
        })
    })
}

export function getTypeInPtBR(type: string) {
    switch (type) {
        case 'movie':
            return 'Filme'
        case 'tv':
            return 'Série'
        default:
            return 'Coleção'
    }
}
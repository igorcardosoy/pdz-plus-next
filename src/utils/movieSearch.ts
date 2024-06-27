import { getMidiaByQueryFromTMDB } from "./requests";

export async function searchMidiaInTMDB(setMidiaList: any, query: string) {
    getMidiaByQueryFromTMDB(query).then((midiaList) => {

        const shortMidiaList = [] as TMDB_midia[]
        for (let index = 0; index < 4; index++) {
            if (midiaList[index] !== undefined) {
                shortMidiaList.push(midiaList[index])
            }
        }

        setMidiaList(shortMidiaList)
    })
}
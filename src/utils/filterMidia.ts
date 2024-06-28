import { PDZ_midia } from "@/entities/PDZ_midia";
import { srwResponsePDZ } from "./swrRequests";

export async function getFilteredMidia(midiaFinded: srwResponsePDZ, midiaType: string, searchText = '' as string): Promise<PDZ_midia[]> {
    switch (midiaType) {
        case 'movie':
            return midiaFinded.data.filter(midia => midia.filter.includes('film'))
        case 'tv':  
            return midiaFinded.data.filter(midia => midia.filter.includes('serie'))
        case 'anime':
            return midiaFinded.data.filter(midia => midia.filter.includes('anime'))
        case 'cartoon':
            return midiaFinded.data.filter(midia => midia.filter.includes('cartoon'))
        case 'search':
            return midiaFinded.data.filter(midia => midia.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
        case 'all':
            return midiaFinded.data
        default:
            return []
    }
}
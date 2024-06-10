"use client"

import { PDZ_midia } from "@/entities/PDZ_midia";
import useSWR from "swr";
import { TMDB_KEY, TMDB_URL, PDZ_URL } from "./requests";

const fetcher = (url: string) => fetch(url).then(res => res.json())

export type srwResponseTMDB = {
    data: TMDB_midia,
    error: any,
    isLoading: boolean
}

export type srwResponsePDZ = {
    data: PDZ_midia[],
    error: any,
    isLoading: boolean
}

export function useGetMidiaFromTMDBWithoutAsync(id: number, type: string): srwResponseTMDB {

    const res: srwResponseTMDB = useSWR(`${TMDB_URL}/${type}/${id}?api_key=${TMDB_KEY}&language=pt-BR`, fetcher)

    if (!res.isLoading && !res.error) {
        return { data: res.data, error: null, isLoading: false }
    }

    return { data: {} as TMDB_midia, error: null, isLoading: true }

}

export function useGetAllMidiaFromPDZWithoutAsync(): srwResponsePDZ {

    
    const movieData: srwResponsePDZ = useSWR(PDZ_URL +'/movie', fetcher)
    const tvData: srwResponsePDZ = useSWR(PDZ_URL +'/tv', fetcher)

    if (!movieData.isLoading && !movieData.error && !tvData.isLoading && !tvData.error) {
        const data = [...movieData.data, ...tvData.data]
        data.sort((a, b) => {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });

        return { data: data, error: null, isLoading: false }
    }

    return { data: [], error: null, isLoading: true }
}
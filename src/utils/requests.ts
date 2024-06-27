import { PDZ_midia } from "@/entities/PDZ_midia";

export const TMDB_KEY:string = String(process.env.NEXT_PUBLIC_TMDB_PUBLIC_KEY)
export const TMDB_URL:string = String(process.env.NEXT_PUBLIC_TMDB_PUBLIC_BASE_URL)
export const PDZ_URL:string = String(process.env.NEXT_PUBLIC_PDZ_PUBLIC_BASE_URL)


export async function getMidiaFromTMDB(id: number, type: string): Promise<TMDB_midia> {

    const res = await fetch(`${TMDB_URL}/${type}/${id}?api_key=${TMDB_KEY}&language=pt-BR`);
    const data = await res.json()

    return data;
}

export async function getMidiaByQueryFromTMDB(query: string): Promise<TMDB_midia[]>{
    const res = await fetch(`${TMDB_URL}/search/multi?api_key=${TMDB_KEY}&language=pt-BR&query=${query}&page=1`);
    const data = await res.json()

    return data.results;
}

export async function getAllMidiaFromPDZ(): Promise<PDZ_midia[]>{
    const options = {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer '
        }
    }

    const resMovies = await fetch(PDZ_URL + '/movie/', options)
    const dataMovies = await resMovies.json();

    const resSeries = await fetch(PDZ_URL + '/tv/', options)
    const dataSeries = await resSeries.json();

    // sort by title

    const data = [...dataMovies, ...dataSeries]
    data.sort((a, b) => {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    });

    return data;
}

export async function getTvFromPDZ(id: number): Promise<PDZ_midia>{
    const options = {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer '
        }
    }

    const res = await fetch(PDZ_URL + '/tv/' + id, options)
    const data = await res.json();

    return data;
}

export async function alredyExistsInPDZ(id: number, type: string): Promise<boolean>{
    const options = {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer '
        }
    }

    const data = await fetch(PDZ_URL + '/' + type + '?' + 'tmdb_id=' + id, options)
    const result = await data.json();

    return result.length > 0
}

export async function sendMovieToPDZ(tmdb_id: number, tmdb_type: string, title: string, filter: Array<string>, magnet_and_resolution: Array<{magnetLink: string, resolution: string}>): Promise<boolean> {

    const movie = new PDZ_midia(title, tmdb_id, tmdb_type, filter)

    for (let i = 0; i < magnet_and_resolution.length; i++) {
        movie.addMagnet(magnet_and_resolution[i])
    }

    const options = {
        method: 'POST',
        body: JSON.stringify({ "title": movie.title, "tmdb_id": movie.tmdb_id, "tmdb_type": movie.tmdb_type, "magnet_and_resolution": movie.magnet_and_resolution, "filter": movie.filter }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    const result = await fetch(PDZ_URL + '/movie', options)

    if (result.status == 400) {
        return false
    } else {
        return true
    }
}

export async function sendTvToPDZ(tv: PDZ_midia): Promise<boolean> {

    const options = {
        method: 'POST',
        body: JSON.stringify({ "title": tv.title, "tmdb_id": tv.tmdb_id, "tmdb_type": tv.tmdb_type, "seasons": tv.seasons, "filter": tv.filter }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    const result = await fetch(PDZ_URL + '/tv', options)


    if (result.status == 400) {
        return false
    } else {
        return true
    }
}

export async function updatePDZMovie(movie: PDZ_midia): Promise<boolean>{
    const options = {
        method: 'PUT',
        body: JSON.stringify({ "title": movie.title, "tmdb_id": movie.tmdb_id, "tmdb_type": movie.tmdb_type, "magnet_and_resolution": movie.magnet_and_resolution, "filter": movie.filter }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    const result = await fetch(PDZ_URL + '/movie', options)

    if (result.status == 400) {
        return false
    } else {
        return true
    }
}

export async function updatePDZTV(tv: PDZ_midia): Promise<boolean> {
    const options = {
        method: 'PUT',
        body: JSON.stringify({ "title": tv.title, "tmdb_id": tv.tmdb_id, "tmdb_type": tv.tmdb_type, "seasons": tv.seasons, "filter": tv.filter }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    const result = await fetch(PDZ_URL + '/tv', options)

    if (result.status == 400) {
        return false
    } else {
        return true
    }
}

export async function deletePDZMidia(id: number, type: string): Promise<boolean> {
    const options = {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    const result = await fetch(`${PDZ_URL}/${type}/${id}`, options)

    if (result.status == 400) {
        return false
    } else {
        return true
    }
}


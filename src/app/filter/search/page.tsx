import ModalCard from "@/app/components/ModalCard"
import StremioButton from "@/app/components/StremioButton"
import { getMidiaByQueryFromTMDB, getAllMidiaFromPDZ } from "@/utils/requests"

const Search = async ({ searchParams = {} as { query: string } }) => {

    const searchText: string = searchParams.query
    const midiaFinded: PDZ_midia[] = await getAllMidiaFromPDZ()
    const midiaFiltered: PDZ_midia[] = []

    // search in PDZ midia finded by title and query

    if (searchText !== undefined) {
        const tmdbMidiaFinded: TMDB_midia[] = await getMidiaByQueryFromTMDB(searchText)

        for (let i = 0; i < tmdbMidiaFinded.length; i++) {
            const tmdbMidia = tmdbMidiaFinded[i]

            const alreadyExists = midiaFinded.find(midia => midia.tmdb_id == tmdbMidia.id)

            console.log(alreadyExists)

            if (alreadyExists !== undefined) {
                midiaFiltered.push(alreadyExists)       
            }
        }
    }

    return (

        <div className="d-flex align-items-center mt-5 flex-column">
            <StremioButton />

            <div className="d-flex justify-content-center flex-wrap gap-5 mt-5 mx-5 mb-5">
                {midiaFiltered.map((midia, index) => {
                    return (
                        <ModalCard modalId={index} pdzMidia={midia}/>
                    )
                })}
            </div>

        </div>
    )
}

export default Search
import ModalCard from "@/components/ModalCard"
import StremioButton from "@/components/StremioButton"
import { getMidiaByQueryFromTMDB, getAllMidiaFromPDZ } from "@/utils/requests"

const Search = async ({ searchParams = {} as { query: string } }) => {

    const searchText: string = searchParams.query
    const midiaFinded: PDZ_midia[] = await getAllMidiaFromPDZ()
    const midiaFiltered: PDZ_midia[] = []

    // search in PDZ midia finded by title and query

    if (searchText !== undefined) {
        midiaFinded.forEach((midia) => {
            if (midia.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                midiaFiltered.push(midia)
            }
        })
    }

    return (

        <div className="flex justify-center items-center mt-5 flex-col">

            <StremioButton />

            <div className="flex justify-center flex-wrap gap-5 mt-5 mx-5 mb-5">
                {midiaFiltered.map((midia, index) => {
                    return (
                        <ModalCard modalId={index} pdzMidia={midia} />
                    )
                })}
            </div>

        </div>
    )
}

export default Search
import ModalCard from "@/app/components/ModalCard"
import StremioButton from "@/app/components/StremioButton"
import { getAllMidiaFromPDZ } from "@/utils/requests"

const Movie = async () => {

    const allMidia = await getAllMidiaFromPDZ()
    const filteredMovies = allMidia.filter(midia => midia.tmdb_type == 'movie')

    return (
        <div className="d-flex align-items-center mt-5 flex-column">
        <StremioButton />

        <div className="d-flex justify-content-center flex-wrap gap-5 mt-5 mx-5 mb-5">
            {filteredMovies.map((midia, index) => {
                return (
                    <ModalCard modalId={index} pdzMidia={midia}/>
                )
            })}
        </div>
    </div>
    )
}

export default Movie
import ModalCard from "@/components/ModalCard"
import StremioButton from "@/components/StremioButton"
import { getAllMidiaFromPDZ } from "@/utils/requests"

const Movie = async () => {

    const allMidia = await getAllMidiaFromPDZ()
    const filteredMovies = allMidia.filter(midia => midia.tmdb_type == 'movie')

    return (
        <div className="flex justify-center items-center mt-5 flex-col">

            <StremioButton />

            <div className="flex justify-center flex-wrap gap-5 mt-5 mx-5 mb-5">
                {filteredMovies.map((midia, index) => {
                    return (
                        <ModalCard key={index} modalId={index} pdzMidia={midia} />
                    )
                })}
            </div>
        </div>
    )
}

export default Movie
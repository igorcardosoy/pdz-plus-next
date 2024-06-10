import ModalCard from "@/components/Modal/ModalCard"
import StremioButton from "@/components/StremioButton"
import { PDZ_midia } from "@/entities/PDZ_midia"
import { getAllMidiaFromPDZ } from "@/utils/requests"

const Tv = async () => {

    const allMidia = await getAllMidiaFromPDZ()
    const filteredMovies: PDZ_midia[] = []

    allMidia.forEach(midia => {
        if (midia.filter.includes('serie')) {
            filteredMovies.push(midia)
        }
    })


    return (
        <div className="flex justify-center items-center mt-5 flex-col">

            <StremioButton />

            <div className="flex justify-center flex-wrap gap-5 ml-40 mr-40 mt-5 mx-5 mb-5">
                {filteredMovies.map((midia, index) => {
                    return (
                        <ModalCard key={index} modalId={index} pdzMidia={midia} />
                    )
                })}
            </div>
        </div>
    )
}

export default Tv
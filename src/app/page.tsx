import { getAllMidiaFromPDZ, getMidiaFromTMDB } from "@/utils/requests"
import ModalCard from "../components/ModalCard"
import StremioButton from "../components/StremioButton"

const Home = async () => {

  const pdzMidia: PDZ_midia[] = await getAllMidiaFromPDZ()

  return (
    <div className="flex justify-center items-center mt-5 flex-col">

      <StremioButton />

      <div className="flex justify-center flex-wrap gap-5 mt-5 mx-5 mb-5">
        {
          pdzMidia.map((midia, index) => {
            return (
              <ModalCard key={index} modalId={index} pdzMidia={midia} />
            )
          })
        }
      </div>

      

    </div>
  )
}

export default Home
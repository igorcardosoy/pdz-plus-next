import { getMidiaFromTMDB } from "@/utils/requests"
import ModalCard from "./components/ModalCard"
import StremioButton from "./components/StremioButton"

const Home = async () => {

  let array = []

  for (let i = 0; i < 25; i++) {
    array.push(i)
  }

  return (
    <div className="d-flex align-items-center mt-5 flex-column">
      
      <StremioButton />

      <div className="d-flex justify-content-center flex-wrap gap-5 mt-5 mx-5">
        {
          array.map((item, index) => {
            return (
              <ModalCard key={index} modalId={index} />
            )
          })
        }
      </div>

    </div>
  )
}

export default Home
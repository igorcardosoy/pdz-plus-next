'use client'

import { isAuthenticated } from "@/utils/authentication"
import ModalCard from "../../components/Modal/ModalCard"
import StremioButton from "../../components/StremioButton"
import { useGetAllMidiaFromPDZWithoutAsync, srwResponsePDZ } from "@/utils/swrRequests"

const Home = () => {

  const isAuth = isAuthenticated()
  const res: srwResponsePDZ = useGetAllMidiaFromPDZWithoutAsync() 

  if (res.isLoading) {
    return(
      <div className="flex justify-center items-center mt-5 flex-col">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    ) 
  }

  if (res.error) {
    return <div>Erro ao carregar os dados</div>
  }


  return (
    <div className="flex justify-center items-center mt-5 flex-col">

      <StremioButton />

      <div className="flex justify-center flex-wrap gap-5 ml-40 mr-40 mt-5 mx-5 mb-5">
        {
          res.data.map((midia, index) => {
            return (
              <ModalCard isAuthenticated={isAuth} key={index} modalId={index} pdzMidia={midia} />
            )
          })
        }
      </div>



    </div>
  )
}

export default Home
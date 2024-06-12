"use client"

import { PDZ_midia } from "@/entities/PDZ_midia"
import ModalCard from "./Modal/ModalCard"
import StremioButton from "./StremioButton"
import { srwResponsePDZ, useGetAllMidiaFromPDZWithoutAsync } from "@/utils/swrRequests"
import { isAuthenticated } from "@/utils/authentication"
import { getFilteredMidia } from "@/utils/filterMidia"

const MidiaContent = ({ midiaType = 'all' as string, searchText = '' as string, }) => {
    const isAuth: boolean = isAuthenticated()
    const midiaFinded: srwResponsePDZ = useGetAllMidiaFromPDZWithoutAsync()
    const midiaFiltered: PDZ_midia[] = []

    if (midiaFinded.isLoading) {
        return (
            <div className="flex justify-center items-center mt-5 flex-col">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    midiaFiltered.push(...getFilteredMidia(midiaFinded, midiaType, searchText))

    return (

        <div className="flex justify-center items-center mt-5 flex-col">

            <StremioButton />

            <div className="flex justify-center flex-wrap gap-5 ml-40 mr-40 mt-5 mx-5 mb-5">
                {midiaFiltered.map((midia, index) => {
                    return (
                        <ModalCard isAuthenticated={isAuth} key={index} modalId={index} pdzMidia={midia} />
                    )
                })}
            </div>

        </div>
    )
}

export default MidiaContent
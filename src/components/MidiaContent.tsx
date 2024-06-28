"use client"

import { PDZ_midia } from "@/entities/PDZ_midia"
import ModalCard from "./Modal/ModalCard"
import StremioButton from "./StremioButton"
import { srwResponsePDZ, useGetAllMidiaFromPDZWithoutAsync } from "@/utils/swrRequests"
import { useAuthenticated } from "@/utils/authentication"
import { getFilteredMidia } from "@/utils/filterMidia"
import { useEffect, useState } from "react"

const MidiaContent = ({ midiaType = 'all' as string, searchText = '' as string, }) => {

    let isAuth = useAuthenticated()

    const [midiaFiltered, setMidiaFiltered] = useState<PDZ_midia[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const midiaFinded: srwResponsePDZ = useGetAllMidiaFromPDZWithoutAsync()

    useEffect(() => {
        const organizeList = async () => {

            const filtered = await getFilteredMidia(midiaFinded, midiaType, searchText);

            setMidiaFiltered(filtered);
            setIsLoading(false);
        };

        organizeList();
    }, [searchText, midiaType, midiaFinded.isLoading]);

    if (midiaFinded.isLoading) {
        return (
            <div className="flex justify-center items-center mt-5 flex-col">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    return (

        <div className="flex justify-center items-center mt-5 flex-col">

            <StremioButton />

            {isLoading && <span className="loading loading-spinner loading-lg"></span>}

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
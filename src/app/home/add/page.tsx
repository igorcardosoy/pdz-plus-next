"use client"

import FormAddMovie from "@/components/Forms/Movie/FormAddMovie"
import FormAddTvMidia from "@/components/Forms/Tv/FormAddTvMidia"
import FormDefault from "@/components/Forms/FormDefault"
import {  useAuthenticated } from "@/utils/authentication"
import { useState } from "react"

const AddMovie = () => {

    let isAuth:boolean = useAuthenticated()
    const [midiaType, setMidiaType] = useState('' as string)

    if (!isAuth) {
        return (<div className="flex justify-center items-center mt-5 flex-col">
            <h1 className="text-2xl">Você não tem permissão para acessar essa página</h1>

            <a href="/home" className="btn btn-primary mt-10">Voltar</a>
        </div>)
    }

    return (
        <div className="mt-10 flex flex-col gap-4 items-center">
            <FormDefault setMidiaType={setMidiaType} />

            {midiaType == 'movie' ? <FormAddMovie /> : ''}
            {midiaType == 'tv' ? <FormAddTvMidia /> : ''}
        </div>
    )
}

export default AddMovie
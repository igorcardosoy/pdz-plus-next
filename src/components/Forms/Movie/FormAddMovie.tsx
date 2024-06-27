'use client'

import { ReactNode, useState } from "react"
import MagnetLinkAndRes from "./MagnetLinkAndRes"
import { sendMovieToPDZ } from "@/utils/requests"

const FormAddMovie = () => {

    const [magnetLinksCount, setMagnetLinksCount] = useState(1)
    const [magnetLinks] = useState([] as ReactNode[])

 
    const addNewMagnetLink = (magnetLinksCount: number): void => {
        setMagnetLinksCount(magnetLinksCount + 1)
        magnetLinks.push(<MagnetLinkAndRes magnetLinkId={magnetLinksCount} key={magnetLinksCount} />)
    }

    const removeLastMagnetLink = (magnetLinksCount: number): void => {
        if (magnetLinksCount > 1) {
            setMagnetLinksCount(magnetLinksCount - 1)
            magnetLinks.pop()
        }
    }

    const handleSubmitForm = (e: any) => {
        e.preventDefault()

        const selectedMidia = document.querySelector('.bg-primary')

        const tmdbId: number | any = selectedMidia?.id
        const tmdbTitle: string | any = selectedMidia?.querySelector('.media_title')?.textContent
        const tmdbType: string | any = selectedMidia?.querySelector('.media_type')?.textContent

        const filters = [] as string[]

        (document.querySelector('#filters')?.querySelectorAll('input') as NodeList).forEach((input: any) => {
            if (input.checked) {
                filters.push(String(input.value))
            }
        })

        const magnetLinksFromInput = [] as Array<{ magnetLink: string, resolution: string }> 

        for (let i = 0; i < magnetLinksCount; i++) {
            const magnetLink: string = (document.getElementById(`magnet-link-${i}`) as any)?.value
            const resolution: string = (document.getElementById(`resolution-${i}`) as any)?.value

            magnetLinksFromInput.push({ magnetLink, resolution })
        }

        sendMovieToPDZ(tmdbId, tmdbType, tmdbTitle, filters, magnetLinksFromInput)

        window.location.href = '/home'      
    }

    return (
        <form id="film-form" onSubmit={handleSubmitForm}>
            <section id="links">

                <MagnetLinkAndRes magnetLinkId={0} key={0} />

                {
                    magnetLinks.map((magnetLink) => {
                        return magnetLink
                    })
                }

                <section className="flex flex-wrap items-center justify-center w-96 items-center gap-5">
                    <section className="flex flex-wrap items-center justify-center w-96 items-center gap-5">
                        <button onClick={() => { addNewMagnetLink(magnetLinksCount) }} id="add-magnet-link" type="button" className="btn btn-primary w-36	">Adicionar Link</button>
                        <button onClick={() => { removeLastMagnetLink(magnetLinksCount) }} id="add-magnet-link" type="button" className="btn btn-error w-36">Remover</button>
                    </section>

                    <button id="send-movie" type="submit" className="btn btn-success w-1/2">Enviar</button>
                </section>

            </section>
        </form>
    )
}

export default FormAddMovie
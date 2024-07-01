"use client"

import ModalButtonMovie from "./ModalButtonMovie"
import ModalButtonTV from "./ModalButtonTV"
import { MagnetLinkWithResolution, PDZ_midia } from "@/entities/PDZ_midia"
import { useGetMidiaFromTMDBWithoutAsync, srwResponseTMDB } from "@/utils/swrRequests"
import ModalRemoveButton from "./ModalRemoveButton"
import Image from "next/image"

const ModalCard = ({ modalId = 0 as number, pdzMidia = {} as PDZ_midia, isAuthenticated = false as boolean }) => {

    const res: srwResponseTMDB = useGetMidiaFromTMDBWithoutAsync(pdzMidia.tmdb_id, pdzMidia.tmdb_type)
    if (res.isLoading) {
        return (
            <div className="flex justify-center items-center mt-5 flex-col">
                <div className="flex flex-col gap-4 w-52">
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
            </div>
        )
    } else if (res.error) {
        return <div>Erro ao carregar os dados</div>
    }

    const handleKeyDownModal = (e: any) => {
        if (e.key === 'Escape') {
            e.target.checked = false
        }
    }

    const tmdbMidia: TMDB_midia = res.data
    const TMDB_IMG_URL = process.env.NEXT_PUBLIC_TMDB_PUBLIC_IMAGE_BASE_URL

    tmdbMidia.backdrop_path = TMDB_IMG_URL + tmdbMidia.backdrop_path

    if (tmdbMidia.title === undefined) {
        tmdbMidia.title = tmdbMidia.name
        tmdbMidia.release_date = tmdbMidia.first_air_date
    }

    tmdbMidia.release_date_type = new Date(String(tmdbMidia.release_date))

    return (

        <div>
            <label htmlFor={"my_modal_" + modalId} className="cursor-pointer shadow-lg">
                <div className="card w-52 bg-base-100 shadow-xl">
                    <figure className="px-5 pt-5">
                        <Image 
                            src={TMDB_IMG_URL + tmdbMidia.poster_path}
                            width={300}
                            height={450}
                            alt={"Poster de " + tmdbMidia.title} 
                            className="rounded-xl" 
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
                        />
                    </figure>
                    <div className="card-body items-center text-center ">
                        <h5 className="text-clip text-wrap align-text-top items-start" style={{ height: '60px' }}> {tmdbMidia.title}</h5>
                    </div>
                </div>
            </label>
            <input onKeyDown={handleKeyDownModal} type="checkbox" id={"my_modal_" + modalId} className="modal-toggle" />

            <div className="modal" role="dialog">
                <div className="modal-box flex gap-5 flex-col ">
                    <label htmlFor={"my_modal_" + modalId} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <section>
                        <h3 className="text-lg font-bold">{tmdbMidia.title}</h3>
                    </section>
                    <section className="alert alert-dark flex flex-col">
                        <h4 className="fs-5 fw-bold">Sinopse</h4>
                        <p className="modal-text">{tmdbMidia.overview}</p>
                    </section>
                    {tmdbMidia.release_date !== undefined ?
                        <section className="alert alert-dark">
                            <h4 className="fs-5 fw-bold">Data de Lançamento:</h4>
                            <p className="modal-text">{tmdbMidia.release_date_type.toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
                        </section>
                        : ''}
                    {tmdbMidia.runtime !== undefined ?
                        <section className="alert alert-dark">
                            <h4 className="fs-5 fw-bold">Duração:</h4>
                            <p className="modal-text">{Math.floor(tmdbMidia.runtime / 60)}h e {tmdbMidia.runtime % 60}min</p>
                        </section>
                        : ''}

                    <div className="modal-action">
                        <div className="flex justify-center gap-3 flex-wrap" style={{ width: "100%", height: "100%" }}>
                            {
                                pdzMidia.magnet_and_resolution?.map((magnetAndRes: MagnetLinkWithResolution, index) => {
                                    return (
                                        <ModalButtonMovie key={pdzMidia.tmdb_id + '-' + pdzMidia.tmdb_type + '-' + index} magnetAndRes={magnetAndRes} />
                                    )
                                })
                            }
                            {
                                pdzMidia.seasons != undefined ? <ModalButtonTV modalId={modalId} midia={pdzMidia} /> : ''
                            }
                            {
                                isAuthenticated ? <ModalRemoveButton type={pdzMidia.tmdb_type} id={pdzMidia.id} /> : ''
                            }
                        </div>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor={"my_modal_" + modalId}></label>
            </div>
        </div >
    )
}

export function getSVG(link: string): JSX.Element {
    let svg: JSX.Element = <></>

    if (link.includes('magnet')) {
        svg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-magnet" viewBox="0 0 16 16" >
            <path d="M8 1a7 7 0 0 0-7 7v3h4V8a3 3 0 0 1 6 0v3h4V8a7 7 0 0 0-7-7m7 11h-4v3h4zM5 12H1v3h4zM0 8a8 8 0 1 1 16 0v8h-6V8a2 2 0 1 0-4 0v8H0z" />
        </svg>
    } else if (link.includes('drive')) {
        svg = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 50 50" >
            <path d="M30.418,6H18.582c-0.724,0-1.392,0.391-1.745,1.023L3.423,30.988c-0.359,0.642-0.337,1.429,0.057,2.05l6.38,10.035 C10.228,43.65,10.864,44,11.548,44h25.903c0.684,0,1.321-0.35,1.688-0.927l6.38-10.035c0.395-0.621,0.417-1.408,0.057-2.05 L32.163,7.023C31.809,6.391,31.142,6,30.418,6z M30.41,8L43.3,31H32.61L20.65,8H30.41z M30.35,31H18.47l5.98-11.34L30.35,31z M5.16,31.97L18.49,8.19l4.84,9.31L10.92,41.01L5.16,31.97z M37.45,42H12.66l4.75-9h25.77L37.45,42z" > </path>
        </svg>
    } else if (link.includes('mediafire')) {
        svg = <svg width="20" height="20" viewBox="0 0 48 48" id="Layer_2" xmlns = "http://www.w3.org/2000/svg" fill = "currentColor" >
            <path className="cls-1" d="M31.39,13.54c6,.2,12.18,3.71,12.11,11-.06,6.2-4.72,10-12.1,10-5.71,0-10.09-4.72-15.92-5.38-4.21-.47,3.39-.2,1.89-2.55-1.36-2.13-5.63-2.49-8.2-2.1-3.74.57-4.41,2-4.67,2.6,2.51-5.8,6.13-3.67,8-6.58.74-1.11-1.72-1.57-3.37-.35a7.06,7.06,0,0,0-.67.67,3.86,3.86,0,0,1,.67-.67,8.89,8.89,0,0,1,5.94-2.22c5.85-.27,11.19,2.93,11.73.28s-5-1.32-4.22-2a12.6,12.6,0,0,1,7.57-2.63Zm2.23,7c-2.37.2-2.45,1.24-4.69,2.44-3.88,2.06-6.19,1.17-6.19,1.28s1.58.74,5.42,2.61a13.82,13.82,0,0,0,5.46,1.59c2.82.08,4.81-1.71,4.81-3.9A4.25,4.25,0,0,0,33.62,20.51Z" />
        </svg >
    }

    return svg
}

export default ModalCard
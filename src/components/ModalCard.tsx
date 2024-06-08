import { getMidiaFromTMDB } from "@/utils/requests"
import ModalButtonMovie from "./ModalButtonMovie"
import ModalButtonTV from "./ModalButtonTV"
import Image from "next/image"

const ModalCard = async ({ modalId = 0 as number, pdzMidia = {} as PDZ_midia }) => {

    const tmdbMidia: TMDB_midia = await getMidiaFromTMDB(pdzMidia.tmdb_id, pdzMidia.tmdb_type)
    const TMDB_IMG_URL = process.env.TMDB_PUBLIC_IMAGE_BASE_URL

    tmdbMidia.backdrop_path = TMDB_IMG_URL + tmdbMidia.backdrop_path

    if (tmdbMidia.title === undefined) {
        tmdbMidia.title = tmdbMidia.name
        tmdbMidia.release_date = tmdbMidia.first_air_date
    }

    tmdbMidia.release_date_type = new Date(String(tmdbMidia.release_date))

    return (

        <div>
            <label htmlFor={"my_modal_" + modalId} className="cursor-pointer">
                <div className="card w-60 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={TMDB_IMG_URL + tmdbMidia.poster_path} alt={"Poster de " + tmdbMidia.title} className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center ">
                        <h5 className="card-title truncate text-wrap align-text-top	items-start" style={{ height: '60px' }}> {tmdbMidia.title}</h5>
                    </div>
                </div>
            </label>
            <input type="checkbox" id={"my_modal_" + modalId} className="modal-toggle" />

            <div className="modal" role="dialog">
                <div className="modal-box flex gap-5 flex-col">
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
                        <div className="flex justify-center gap-3" style={{ width: "100%", height: "100%" }}>
                            {
                                pdzMidia.magnet_and_resolution?.map((magnetAndRes) => {
                                    return (
                                        <ModalButtonMovie key={pdzMidia.tmdb_id + '-' + pdzMidia.tmdb_type} magnetAndRes={magnetAndRes} />
                                    )
                                })
                            }
                            {
                                pdzMidia.seasons != undefined ? <ModalButtonTV modalId={modalId} midia={pdzMidia} /> : ''
                            }
                        </div>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor={"my_modal_" + modalId}></label>
            </div>
        </div >
    )
}

export default ModalCard